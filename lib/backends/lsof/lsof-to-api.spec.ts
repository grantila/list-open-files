import {
	rawTypeToType,
	makeFileBase,
	makeFileDescriptorBase,
	makeInternalFile,
	makeFile,
	makeUnknownFile,
	makeIP,
	makeProcess,
	// makeProcess,
	// transformParts,
} from "./lsof-to-api"
import { RawType, RawFile } from "./types";

/*
export function makeFileBase( file: RawFile ): FileBase
export function makeFileDescriptorBase( file: RawFile ): FileDescriptorBase
export function makeInternalFile( file: RawFile ): InternalFile
export function makeFile( file: RawFile ): File
export function makeUnknownFile( file: RawFile ): UnknownFile
export function makeIP( file: RawFile ): FileDescriptorIP | void
export function makeProcess( rawLsofProcess: RawLsofProcess ): Process
export function transformParts( rawLsofProcesses: Array< RawLsofProcess > )
*/

describe( "rawTypeToType", ( ) =>
{
	const rawTypes: Array< RawType > = [
		"IPv4", "IPv6", "ax25", "inet", "lla", "rte", "sock", "unix", "x.25",
		"BLK", "CHR", "DEL", "DIR", "DOOR", "FIFO", "KQUEUE", "LINK", "MPB",
		"MPC", "NOFD", "NPOLICY", "PAS", "PAXV", "PCRE", "PCTL", "PCUR",
		"PCWD", "PDIR", "PETY", "PFD", "PFDR", "PFIL", "PFPR", "PGD", "PGID",
		"PIPE", "PLC", "PLDR", "PLDT", "PLPI", "PLST", "PLU", "PLWG", "PLWI",
		"PLWS", "PLWU", "PLWX", "PMAP", "PMEM", "PNTF", "POBJ", "PODR",
		"POLP", "POPF", "POPG", "PORT", "PREG", "PRMP", "PRTD", "PSGA",
		"PSIN", "PSTA", "PSXSEM", "PSXSHM", "PUSG", "PW", "PXMP", "REG",
		"SMT", "STSO", "systm", "UNNM", "XNAM", "XSEM", "XSD"
	];

	it( "should return most types as is", ( ) =>
	{
		rawTypes
		.filter( type => type !== "IPv4" && type !== "IPv6" )
		.forEach( type =>
		{
			expect( rawTypeToType( type ) ).toBe( type );
		} );
	} );

	it( "should return IP for IPv4 and IPv6", ( ) =>
	{
		rawTypes
		.filter( type => type === "IPv4" || type === "IPv6" )
		.forEach( type =>
		{
			expect( rawTypeToType( type ) ).toBe( "IP" );
		} );
	} );
} );

describe( "makeFileBase", ( ) =>
{
	it( "forward undefined", ( ) =>
	{
		expect(
			makeFileBase( < RawFile >{ } )
		).toEqual( {
			type: undefined,
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: undefined,
		} );
	} );

	it( "convert realistic values", ( ) =>
	{
		expect(
			makeFileBase( < RawFile >< Partial< RawFile > >{
				t: "CHR",
				a: "r",
				l: "x",
				s: 17,
				i: 42,
				k: 5,
				n: "foo",
			} )
		).toEqual( {
			type: "CHR",
			access: "r",
			lock: "x",
			size: 17,
			iNode: 42,
			linkCount: 5,
			name: "foo",
		} );
	} );
} );

describe( "makeFileDescriptorBase", ( ) =>
{
	it( "should throw on non-numberic fd", ( ) =>
	{
		expect(
			( ) => makeFileDescriptorBase( < RawFile >{ } )
		).toThrow( /Invalid/ );
	} );

	it( "forward undefined", ( ) =>
	{
		expect(
			makeFileDescriptorBase( < RawFile >{
				f: 3,
			} )
		).toEqual( {
			type: undefined,
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: undefined,
			fd: 3,
		} );
	} );

	it( "forward realistic values", ( ) =>
	{
		expect(
			makeFileDescriptorBase( < RawFile >< Partial< RawFile > >{
				t: "CHR",
				a: "r",
				l: "x",
				s: 17,
				i: 42,
				k: 5,
				n: "foo",
				f: 3,
			} )
		).toEqual( {
			type: "CHR",
			access: "r",
			lock: "x",
			size: 17,
			iNode: 42,
			linkCount: 5,
			name: "foo",
			fd: 3,
		} );
	} );
} );

describe( "makeInternalFile", ( ) =>
{
	it( "forward undefined", ( ) =>
	{
		expect(
			makeInternalFile( < RawFile >{ } )
		).toEqual( {
			type: undefined,
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: undefined,
			fd: 'undefined',
		} );
	} );

	it( "forward realistic values", ( ) =>
	{
		expect(
			makeInternalFile( < RawFile >< Partial< RawFile > >{
				t: "CHR",
				a: "r",
				l: "x",
				s: 17,
				i: 42,
				k: 5,
				n: "foo",
				f: 3,
			} )
		).toEqual( {
			type: "CHR",
			access: "r",
			lock: "x",
			size: 17,
			iNode: 42,
			linkCount: 5,
			name: "foo",
			fd: "3",
		} );
	} );
} );

describe( "makeFile", ( ) =>
{
	it( "forward undefined", ( ) =>
	{
		expect(
			makeFile( < RawFile >{
				f: 3,
			} )
		).toEqual( {
			type: undefined,
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: undefined,
			fd: 3,
			majorMinorDeviceNumber: undefined,
			flags: undefined,
			offset: undefined,
		} );
	} );

	it( "forward realistic values", ( ) =>
	{
		expect(
			makeFile( < RawFile >< Partial< RawFile > >{
				t: "CHR",
				a: "r",
				l: "x",
				s: 17,
				i: 42,
				k: 5,
				n: "foo",
				f: 3,
				D: 44,
				G: 'foo',
				o: 55,
			} )
		).toEqual( {
			type: "CHR",
			access: "r",
			lock: "x",
			size: 17,
			iNode: 42,
			linkCount: 5,
			name: "foo",
			fd: 3,
			majorMinorDeviceNumber: 44,
			flags: 'foo',
			offset: 55,
		} );
	} );
} );

describe( "makeUnknownFile", ( ) =>
{
	it( "forward undefined", ( ) =>
	{
		expect(
			makeUnknownFile( < RawFile >{
				f: 3,
			} )
		).toEqual( {
			type: undefined,
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: undefined,
			fd: 3,

			cmd: undefined,
			fileStructureShareCount: undefined,
			charCode: undefined,
			majorMinorDeviceNumber: undefined,
			fileStructureAddress: undefined,
			flags: undefined,
			loginName: undefined,
			node: undefined,
			offset: undefined,
			protocolName: undefined,
			deviceNumber: undefined,
			streamIdentification: undefined,
			tcpTpiInformation: undefined,
			solarisZoneName: undefined,
			seLinuxSecurityContext: undefined,
			1: undefined,
			2: undefined,
			3: undefined,
			4: undefined,
			5: undefined,
			6: undefined,
			7: undefined,
			8: undefined,
			9: undefined,
			} );
	} );

	it( "forward realistic values", ( ) =>
	{
		expect(
			makeUnknownFile( < RawFile >< Partial< RawFile > >{
				t: "CHR",
				a: "r",
				l: "x",
				s: 17,
				i: 42,
				k: 5,
				n: "foo",
				f: 3,

				c: 'thecmd',
				C: 44,
				d: 55,
				D: 66,
				F: 77,
				G: 'flg',
				L: 'gustaf',
				N: 'nd',
				o: 88,
				P: 'proto',
				r: 99,
				S: 'sid',
				T: 'tti',
				z: 'zn',
				Z: 'selsc',
				1: 101,
				2: 102,
				3: 103,
				4: 104,
				5: 105,
				6: 106,
				7: 107,
				8: 108,
				9: 109,
			} )
		).toEqual( {
			type: "CHR",
			access: "r",
			lock: "x",
			size: 17,
			iNode: 42,
			linkCount: 5,
			name: "foo",
			fd: 3,

			cmd: 'thecmd',
			fileStructureShareCount: 44,
			charCode: 55,
			majorMinorDeviceNumber: 66,
			fileStructureAddress: 77,
			flags: 'flg',
			loginName: 'gustaf',
			node: 'nd',
			offset: 88,
			protocolName: 'proto',
			deviceNumber: 99,
			streamIdentification: 'sid',
			tcpTpiInformation: 'tti',
			solarisZoneName: 'zn',
			seLinuxSecurityContext: 'selsc',
			1: 101,
			2: 102,
			3: 103,
			4: 104,
			5: 105,
			6: 106,
			7: 107,
			8: 108,
			9: 109,
		} );
	} );
} );

describe( "makeIP", ( ) =>
{
	it( "forward undefined", ( ) =>
	{
		expect(
			makeIP( < RawFile >{
				f: 3,
			} )
		).toEqual( undefined );
	} );

	it( "forward empty", ( ) =>
	{
		expect(
			makeIP( < RawFile >{
				f: 3,
				n: 'x',
				t: 'IPv4',
			} )
		).toEqual( {
			type: 'IP',
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: 'x',
			fd: 3,

			protocol: undefined,
			version: 4,
			from: undefined,
			to: undefined,
		} );
	} );

	it( "forward realistic values listen", ( ) =>
	{
		expect(
			makeIP( < RawFile >< Partial< RawFile > >{
				t: "IPv4",
				n: "*:3000",
				f: 3,
				P: 'tcp',
			} )
		).toEqual( {
			type: "IP",
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: "*:3000",
			fd: 3,

			protocol: 'tcp',
			version: 4,
			from: undefined,
			to: {
				address: '*',
				port: 3000,
			},
		} );
	} );

	it( "forward realistic values connected", ( ) =>
	{
		expect(
			makeIP( < RawFile >< Partial< RawFile > >{
				t: "IPv4",
				n: "1.2.3.4:3000->5.6.7.8:5000",
				f: 3,
				P: 'tcp',
			} )
		).toEqual( {
			type: "IP",
			access: undefined,
			lock: undefined,
			size: undefined,
			iNode: undefined,
			linkCount: undefined,
			name: "1.2.3.4:3000->5.6.7.8:5000",
			fd: 3,

			protocol: 'tcp',
			version: 4,
			from: {
				address: "1.2.3.4",
				port: 3000,
			},
			to: {
				address: '5.6.7.8',
				port: 5000,
			},
		} );
	} );
} );

describe( "makeProcess", ( ) =>
{
	it( "forward undefined", ( ) =>
	{
		expect(
			makeProcess( {
				proc: {
					p: <any>undefined,
					R: undefined,
					g: undefined,
					K: undefined,
					u: undefined,
					c: undefined,
				},
				files: [ ],
			} )
		).toEqual( {
			pid: undefined,
			ppid: undefined,
			gpid: undefined,
			tid: undefined,
			user: undefined,
			name: undefined,
			cwd: undefined,	
		} );
	} );

	it( "forward realistic values w/o files", ( ) =>
	{
		expect(
			makeProcess( {
				proc: {
					p: 1,
					R: 2,
					g: 3,
					K: 4,
					u: 'gustaf',
					c: 'thename',
				},
				files: [ ],
			} )
		).toEqual( {
			pid: 1,
			ppid: 2,
			gpid: 3,
			tid: 4,
			user: 'gustaf',
			name: 'thename',
			cwd: void 0,
		} );
	} );

	it( "forward realistic values w/ files", ( ) =>
	{
		expect(
			makeProcess( {
				proc: {
					p: 1,
					R: 2,
					g: 3,
					K: 4,
					u: 'gustaf',
					c: 'cmd',
				},
				files: [
					< RawFile >{
						t: 'DIR',
						a: "r",
						l: "x",
						s: 17,
						i: 42,
						k: 5,
						n: 'folder',
						f: 'cwd',
					},
				],
			} )
		).toEqual( {
			pid: 1,
			ppid: 2,
			gpid: 3,
			tid: 4,
			user: 'gustaf',
			name: 'cmd',
			cwd: {
				type: "DIR",
				access: "r",
				lock: "x",
				size: 17,
				iNode: 42,
				linkCount: 5,
				name: "folder",
				fd: "cwd",
			},
		} );
	} );
} );
