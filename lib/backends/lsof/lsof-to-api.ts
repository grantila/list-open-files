import {
	FileDescriptorIP,
	IP,
	Process,
	FileDescriptorBase,
	Type,
	FileBase,
	InternalFile,
	File,
	ProcessInfo,
	UnknownFile,
} from "../../types";

import {
	RawFile,
	RawLsofProcess,
	RawType,
} from "./types"

import { toInteger, tryToInteger } from "../../utils"

export function rawTypeToType( rawType: RawType ): Type
{
	switch ( rawType )
	{
		case 'IPv4':
		case 'IPv6':
			return 'IP';
	}
	return rawType;
}

export function makeFileBase( file: RawFile ): FileBase
{
	return {
		type: rawTypeToType( < RawType >file.t ),
		access: file.a,
		lock: file.l,
		size: file.s == null ? void 0 : toInteger( file.s ),
		iNode: file.i,
		linkCount: file.k,
		name: file.n,
	};
}

export function makeFileDescriptorBase( file: RawFile ): FileDescriptorBase
{
	const fd = parseInt( '' + file.f, 10 );
	if ( '' + fd !== '' + file.f )
		throw new Error( `Invalid 'f', expect number: ${file.f}` );

	return {
		fd,
		...makeFileBase( file ),
	};
}

export function makeInternalFile( file: RawFile ): InternalFile
{
	return {
		fd: '' + file.f,
		...makeFileBase( file ),
	};
}

export function makeFile( file: RawFile ): File
{
	return {
		...makeFileDescriptorBase( file ),
		majorMinorDeviceNumber:
			file.D == null ? void 0 : tryToInteger( file.D, false ),
		flags: file.G,
		offset: file.o == null ? void 0 : tryToInteger( file.o, false ),
	};
}

export function makeUnknownFile( file: RawFile ): UnknownFile
{
	return {
		...makeFileDescriptorBase( file ),

		cmd: file.c,
		fileStructureShareCount:
			file.C == null ? void 0 : tryToInteger( file.C, false ),
		charCode: file.d,
		majorMinorDeviceNumber:
			file.D == null ? void 0 : tryToInteger( file.D, false ),
		fileStructureAddress: file.F,
		flags: file.G,
		loginName: file.L,
		node: file.N,
		offset: file.o == null ? void 0 : tryToInteger( file.o, false ),
		protocolName: file.P,
		deviceNumber: file.r,
		streamIdentification: file.S,
		tcpTpiInformation: file.T,
		solarisZoneName: file.z,
		seLinuxSecurityContext: file.Z,
		1: file['1'],
		2: file['2'],
		3: file['3'],
		4: file['4'],
		5: file['5'],
		6: file['6'],
		7: file['7'],
		8: file['8'],
		9: file['9'],
	};
}

export function makeIP( file: RawFile ): FileDescriptorIP | void
{
	const parseIP = ( text: string ): IP | void =>
	{
		const m = text.match( /^(.*):([^:]+)$/ );
		if ( !m )
			return void 0;
		const address = m[ 1 ];
		const port = parseInt( m[ 2 ], 10 );
		return { address, port };
	}

	const { n, t } = file;
	if ( !n || !t )
		return;

	const [ _from, _to ] =
		n.includes( '->' )
		? n.split( '->' )
		: [ void 0, void 0 ];
	const from = _from ? parseIP( _from ) : void 0;
	const to = parseIP( _to ? _to : n );

	return {
		...makeFileDescriptorBase( file ),
		type: 'IP',

		protocol: < any >file.P,
		version: <  4 | 6 >parseInt( t.charAt( 3 ), 10 ),
		from,
		to,
	};
}

export function makeProcess( rawLsofProcess: RawLsofProcess ): Process
{
	const pid = rawLsofProcess.proc.p;
	const ppid = rawLsofProcess.proc.R;
	const gpid = rawLsofProcess.proc.g;
	const tid = rawLsofProcess.proc.K;
	const user = rawLsofProcess.proc.u;
	const name = rawLsofProcess.proc.c;

	const rawCwd = rawLsofProcess.files.find( file => file.f === 'cwd' );
	const cwd = rawCwd ? makeInternalFile( rawCwd ) : void 0;

	return {
		pid,
		ppid,
		gpid,
		tid,
		user,
		name,
		cwd,
	};
}

function rawToParsed( rawFile: RawFile, pid: number )
{
	try
	{
		switch ( rawFile.t )
		{
			case 'IPv4':
			case 'IPv6':
				return makeIP( rawFile ) || makeUnknownFile( rawFile );
			case 'CHR':
			case 'REG':
			case 'KQUEUE':
			case 'PIPE':
			case 'NPOLICY':
			case 'unix':
			case 'systm':
			case 'PSXSHM':
				return makeFile( rawFile );
			default:
				return makeUnknownFile( rawFile );
		}
	}
	catch ( err )
	{
		err.pid = pid;
		throw err;
	}
}

export function transformParts( rawLsofProcesses: Array< RawLsofProcess > )
: Array< ProcessInfo >
{
	const isOrdinaryFile = ( file: RawFile ) =>
		( '' + file.f ) === '' + ( parseInt( '' + file.f, 10 ) );

	return rawLsofProcesses.map( rawLsofProcess =>
	{
		const process = makeProcess( rawLsofProcess );
		const texts = rawLsofProcess.files
			.filter( file => !isOrdinaryFile( file ) )
			.map( file => makeInternalFile( file ) );
		const files = rawLsofProcess.files
			.filter( file => Object.keys( file ).length > 0 )
			.filter( file => isOrdinaryFile( file ) )
			.map( file => rawToParsed( file, process.pid ) );
		return { process, texts, files };
	} );
}
