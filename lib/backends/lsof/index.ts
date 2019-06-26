import { exec as asyncExec } from 'child_process';
import { promisify } from 'util';

import { RawFile, RawProcess, RawLsofProcess } from './types';
import { transformParts } from './lsof-to-api';
import { toInteger } from '../../utils';
import { ProcessInfo } from '../../types';

const exec = promisify( asyncExec );

const oneToNineDescription =
	"1-9  dialect-specific field identifiers (The output\n" +
	" of -F? identifies the information to be found\n" +
	" in dialect-specific fields.)";

interface FieldInfo< Type >
{
	code: number;
	description: string;
	handler?: ( raw: string ) => Type;
}

type AllFields = RawFile & RawProcess & { "\n": any; };

type Fields = { [ K in keyof AllFields ]: FieldInfo< AllFields[ K ] > }

const fields: Fields = {
	a: {
		code: "a".charCodeAt( 0 ),
		description: "file access mode r w u(=rw)",
	},
	c: {
		code: "c".charCodeAt( 0 ),
		description:
			"process command name (all characters from proc or user structure)",
	},
	C: {
		code: "C".charCodeAt( 0 ),
		description: "file structure share count",
		handler: toInteger,
	},
	d: {
		code: "d".charCodeAt( 0 ),
		description: "file's device character code",
		handler: toInteger,
	},
	D: {
		code: "D".charCodeAt( 0 ),
		description: "file's major/minor device number (0x<hexadecimal>)",
		handler: toInteger,
	},
	f: {
		code: "f".charCodeAt( 0 ),
		description: "file descriptor (always selected)",
	},
	F: {
		code: "F".charCodeAt( 0 ),
		description: "file structure address (0x<hexadecimal>)",
		handler: toInteger,
	},
	G: {
		code: "G".charCodeAt( 0 ),
		description: "file flaGs (0x<hexadecimal>; names if +fg follows)",
	},
	g: {
		code: "g".charCodeAt( 0 ),
		description: "process group ID",
		handler: toInteger,
	},
	i: {
		code: "i".charCodeAt( 0 ),
		description: "file's inode number",
	},
	K: {
		code: "K".charCodeAt( 0 ),
		description: "tasK ID",
		handler: toInteger,
	},
	k: {
		code: "k".charCodeAt( 0 ),
		description: "link count",
		handler: toInteger,
	},
	l: {
		code: "l".charCodeAt( 0 ),
		description: "file's lock status",
	},
	L: {
		code: "L".charCodeAt( 0 ),
		description: "process login name",
	},
	n: {
		code: "n".charCodeAt( 0 ),
		description: "file name, comment, Internet address",
	},
	N: {
		code: "N".charCodeAt( 0 ),
		description: "node identifier (ox<hexadecimal>",
	},
	o: {
		code: "o".charCodeAt( 0 ),
		description: "file's offset (decimal)",
		handler: toInteger,
	},
	p: {
		code: "p".charCodeAt( 0 ),
		description: "process ID (always selected)",
	},
	P: {
		code: "P".charCodeAt( 0 ),
		description: "protocol name",
	},
	r: {
		code: "r".charCodeAt( 0 ),
		description: "raw device number (0x<hexadecimal>)",
		handler: toInteger,
	},
	R: {
		code: "R".charCodeAt( 0 ),
		description: "parent process ID",
		handler: toInteger,
	},
	s: {
		code: "s".charCodeAt( 0 ),
		description: "file's size (decimal)",
		handler: toInteger,
	},
	S: {
		code: "S".charCodeAt( 0 ),
		description: "file's stream identification",
	},
	t: {
		code: "t".charCodeAt( 0 ),
		description: "file's type",
	},
	T: {
		code: "T".charCodeAt( 0 ),
		description:
			"TCP/TPI information, identified by prefixes (the '='" +
			" is part of the prefix):\n" +
			"QR=<read queue size>\n" +
			"QS=<send queue size>\n" +
			"SO=<socket options and values> (not all dialects)\n" +
			"SS=<socket states> (not all dialects)\n" +
			"ST=<connection state>\n" +
			"TF=<TCP flags and values> (not all dialects)\n" +
			"WR=<window read size>  (not all dialects)\n" +
			"WW=<window write size>  (not all dialects)\n" +
			"(TCP/TPI information isn't reported for all supported\n" +
			"UNIX dialects. The -h or -? help output for the\n" +
			"-T option will show what TCP/TPI reporting can be\n" +
			"requested.)",
	},
	u: {
		code: "u".charCodeAt( 0 ),
		description: "process user ID",
	},
	z: {
		code: "z".charCodeAt( 0 ),
		description: "Solaris 10 and higher zone name",
	},
	Z: {
		code: "Z".charCodeAt( 0 ),
		description:
			"SELinux security context (inhibited when SELinux is disabled)",
	},
	1: {
		code: "1".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	2: {
		code: "2".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	3: {
		code: "3".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	4: {
		code: "4".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	5: {
		code: "5".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	6: {
		code: "6".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	7: {
		code: "7".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	8: {
		code: "8".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	9: {
		code: "9".charCodeAt( 0 ),
		description: oneToNineDescription,
	},
	"\n": {
		code: "\n".charCodeAt( 0 ),
		description: "New file delimiter",
	},
};

const fieldMap: { [ key: number ]: string } = { };
Object.keys( fields ).forEach( key =>
{
	const field = fields[ key as keyof typeof fields ]
	const code = ( < NonNullable< typeof field > >field ).code;
	fieldMap[ code ] = key;
} );

function getParts( buffer: Buffer ): Array< Buffer >
{
	const parts: Array< Buffer > = [ ];
	let pos = 0;

	while ( true )
	{
		const end = buffer.indexOf( 0, pos );

		if ( end === -1 )
		{
			parts.push( buffer.slice( pos ) );
			break;
		}
		else
		{
			parts.push( buffer.slice( pos, end ) );
			pos = end + 1;
		}
	}

	return parts;
}

function parseParts( parts: Array< Buffer > )
{
	const processes: Array< RawLsofProcess > = [ ];
	let cur: RawLsofProcess;

	const parsePart = ( part: Buffer ) =>
	{
		const fieldCode = part[ 0 ];
		const fieldKey = fieldMap[ fieldCode ];

		if ( !fieldKey )
			throw new Error( `Invalid field in reponse from 'lsof': ${part}` );

		if ( fieldKey === 'p' )
		{
			// New process
			cur = {
				proc: {
					p: toInteger( part.slice( 1 ).toString( ) ),
				},
				files: [ ],
			};
			processes.push( cur );
			return;
		}

		if ( !cur )
			throw new Error( "Invalid response from 'lsof', missing pid" );

		if ( fieldKey === "\n" )
		{
			cur.files.push( < RawFile >{ } );
			parsePart( part.slice( 1 ) );
			return;
		}

		// Regular field, generic parsing
		const field = fieldKey as keyof typeof fields;

		const rawValue = part.slice( 1 ).toString( );

		const fieldInfo = fields[ field ];

		const value = fieldInfo && fieldInfo.handler
			? fieldInfo.handler( rawValue )
			: rawValue;

		if ( cur.files.length > 0 )
			// File part
			cur.files[ cur.files.length - 1 ][ field as keyof RawFile ] =
				value;
		else
			// Process part
			cur.proc[ field as keyof RawProcess ] = value;
	};

	parts =
		parts.length > 0
		&& parts[ parts.length - 1 ].length === 1
		&& parts[ parts.length - 1 ][ 0 ] === 10
		? parts.slice( 0, parts.length - 1 )
		: parts;

	parts.forEach( parsePart );

	return processes;
}

async function invoke( pids: Array< number > ): Promise< Buffer >
{
	const { stdout } = await exec(
		`lsof -M -P -n -F 0 +fG -p ${pids.join( ',' )}`,
		{ encoding: "buffer" }
	);

	return stdout;
}

async function lsofAndTransform( pids: Array< number > )
{
	const buf = await invoke( pids );
	const parts = getParts( buf );
	const rawResult = parseParts( parts );
	return transformParts( rawResult );
}

export async function lsof( pids: Array< number >, concurrency: number )
{
	const nchunks = Math.max( Math.min( concurrency, pids.length ), 1 );
	const chunks: Array< Array< number > > = [ ];
	const chunksize = pids.length / nchunks;

	for ( var i = 0; i < nchunks; ++i )
	{
		chunks.push( pids.slice( i * chunksize, ( i + 1 ) * chunksize ) );
	}

	const chunkedProcesses =
		await Promise.all( chunks.map( pids => lsofAndTransform( pids ) ) );

	return ( [ ] as Array< ProcessInfo > ).concat( ...chunkedProcesses );
}
