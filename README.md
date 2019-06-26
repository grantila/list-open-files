[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][coverage-image]][coverage-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/grantila/list-open-files.svg)](https://greenkeeper.io/)
[![Language grade: JavaScript][lgtm-image]][lgtm-url]


# list-open-files

[`lsof`](http://man7.org/linux/man-pages/man8/lsof.8.html) for Node.js, with an asynchronous Promise-based API and JSON-serializable self-explained objects.

# API

```ts
import { lsof, Options } from "list-open-files"

lsof( opts?: Options ): Promise< Array< ProcessInfo > >;
```

The optional options object is defined as:

```ts
interface Options
{
	pids?: Array< number >;
	concurrency?: number;
}
```

If no `pids` are provided, the current process will be queried.

If `concurrency` is specified, it will be used to call the underlying `lsof` command with that concurrency (at most). The default is built-in and environment specific - it depends on the underlying hardware and is optimized, and therefore generally a good choice. To affect the host computer the least, specify `1`, although this will have a very small effect.

The return value is eventually an array (even if only one pid is queried) of zero or more `ProcessInfo` objects each on the form:

```ts
interface ProcessInfo
{
	process: Process;
	files: Array< File | FileDescriptorIP | UnknownFile >;
	texts: Array< InternalFile >;
}
```

## Example

### All open files in a primitive Node.js application

```ts
import { lsof } from "list-open-files"

lsof( ).then( result => console.log( result ) );
```

When run on MacOS as `node . > output.txt`, will write a file called `output.txt` (note fd 1)

<details><summary>View `output.txt`</summary><p>

```json
[
	{
		"process": {
			"pid": 26549,
			"ppid": 13150,
			"gpid": 26549,
			"user": "501",
			"name": "node",
			"cwd": {
				"fd": "cwd",
				"type": "DIR",
				"access": " ",
				"lock": " ",
				"size": 512,
				"iNode": "10101630",
				"linkCount": 16,
				"name": "/tmp/list-open-files"
			}
		},
		"texts": [
			{
				"fd": "txt",
				"type": "REG",
				"access": " ",
				"lock": " ",
				"size": 40180432,
				"iNode": "9886022",
				"linkCount": 1,
				"name": "/tmp/node/bin/node"
			},
			{
				"fd": "txt",
				"type": "REG",
				"access": " ",
				"lock": " ",
				"size": 973824,
				"iNode": "9995914",
				"linkCount": 1,
				"name": "/usr/lib/dyld"
			}
		],
		"files": [
			{
				"fd": 0,
				"type": "CHR",
				"access": "u",
				"lock": " ",
				"iNode": "689",
				"linkCount": 1,
				"name": "/dev/ttys026",
				"majorMinorDeviceNumber": 1285824432,
				"flags": "0x3;0x3",
				"offset": 4568009
			},
			{
				"fd": 1,
				"type": "REG",
				"access": "w",
				"lock": " ",
				"size": 0,
				"iNode": "10603551",
				"linkCount": 1,
				"name": "/tmp/list-open-files/output.txt",
				"majorMinorDeviceNumber": 16777220,
				"flags": "0x2;0x2"
			},
			{
				"fd": 2,
				"type": "CHR",
				"access": "u",
				"lock": " ",
				"iNode": "689",
				"linkCount": 1,
				"name": "/dev/ttys026",
				"majorMinorDeviceNumber": 1285824432,
				"flags": "0x3;0x3",
				"offset": 4568009
			},
			{
				"fd": 3,
				"type": "KQUEUE",
				"access": "u",
				"lock": " ",
				"name": "count=0, state=0",
				"flags": "0x3;0x2"
			},
			{
				"fd": 4,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319193139d"
			},
			{
				"fd": 5,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319192f4dd"
			},
			{
				"fd": 6,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319193019d"
			},
			{
				"fd": 7,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319193025d"
			},
			{
				"fd": 8,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319193121d"
			},
			{
				"fd": 9,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c31919312dd"
			},
			{
				"fd": 10,
				"type": "KQUEUE",
				"access": "u",
				"lock": " ",
				"name": "count=0, state=0xa",
				"flags": "0x3;0x2"
			},
			{
				"fd": 11,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319192f59d"
			},
			{
				"fd": 12,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319193031d"
			},
			{
				"fd": 13,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c3189f2939d"
			},
			{
				"fd": 14,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c319193145d"
			},
			{
				"fd": 15,
				"type": "KQUEUE",
				"access": "u",
				"lock": " ",
				"name": "count=0, state=0xa",
				"flags": "0x3;0x2"
			},
			{
				"fd": 16,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c3189f2945d"
			},
			{
				"fd": 17,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c3189f2975d"
			},
			{
				"fd": 18,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c3189f26c9d"
			},
			{
				"fd": 19,
				"type": "PIPE",
				"access": " ",
				"lock": " ",
				"size": 16384,
				"name": "->0xa5332c3189f2735d"
			},
			{
				"fd": 20,
				"type": "CHR",
				"access": "r",
				"lock": " ",
				"iNode": "311",
				"linkCount": 1,
				"name": "/dev/null",
				"majorMinorDeviceNumber": 1285824432,
				"flags": "0x1;0x2",
				"offset": 0
			},
			{
				"fd": 21,
				"type": "unix",
				"access": "u",
				"lock": " ",
				"name": "->0xa5332c31a4d693a5",
				"flags": "0x7;0x2",
				"offset": 0
			},
			{
				"fd": 23,
				"type": "unix",
				"access": "u",
				"lock": " ",
				"name": "->0xa5332c31a4d6b21d",
				"flags": "0x7;0x2",
				"offset": 0
			},
			{
				"fd": 25,
				"type": "unix",
				"access": "u",
				"lock": " ",
				"name": "->0xa5332c31a4d6b6cd",
				"flags": "0x7;0x2",
				"offset": 0
			}
		]
	}
]
```

</p></details>

### Listening and client connections

The following application creates a listening port (which will happen to listen on IPv6, which also supports IPv4). It then connects to it, which results on two more sockets, one for the outgoing client socket, one for the incoming socket since the application connects to itself.

```ts
import { lsof } from "list-open-files"
import { createServer, connect, AddressInfo } from 'net'

async function testIP( ): Promise< void >
{
	const [ result1 ] = await lsof( ); // Files before server is listening

	const server = createServer( );

	await new Promise( ( resolve, reject ) =>
	{
		server.listen( );
		server.on( 'listening', resolve );
		server.on( 'error', reject );
	} );

	const { port } = < AddressInfo >server.address( )

	const [ result2 ] = await lsof( ); // Files after the server is listening

	await new Promise( ( resolve, reject ) =>
	{
		const client = connect( port, 'localhost' );
		client.on( 'connect', resolve );
		client.on( 'error', reject );
	} );

	const [ result3 ] = await lsof( ); // Files after client connection is established

	console.log( result1.files.filter( file => file.type === 'IP' ) );
	console.log( result2.files.filter( file => file.type === 'IP' ) );
	console.log( result3.files.filter( file => file.type === 'IP' ) );
}

testIP( )
.catch( err => console.error( err ) );
```

This will output:

```js
[]
[
	{
		fd: 22,
		type: 'IP',
		access: 'u',
		lock: ' ',
		size: undefined,
		iNode: undefined,
		linkCount: undefined,
		name: '*:50710',
		protocol: 'TCP',
		version: 6,
		from: undefined,
		to: { address: '*', port: 50710 }
	}
]
[
	{
		fd: 22,
		type: 'IP',
		access: 'u',
		lock: ' ',
		size: undefined,
		iNode: undefined,
		linkCount: undefined,
		name: '*:50710',
		protocol: 'TCP',
		version: 6,
		from: undefined,
		to: { address: '*', port: 50710 }
	},
	{
		fd: 26,
		type: 'IP',
		access: 'u',
		lock: ' ',
		size: undefined,
		iNode: undefined,
		linkCount: undefined,
		name: '127.0.0.1:50711->127.0.0.1:50710',
		protocol: 'TCP',
		version: 4,
		from: { address: '127.0.0.1', port: 50711 },
		to: { address: '127.0.0.1', port: 50710 }
	},
	{
		fd: 28,
		type: 'IP',
		access: 'u',
		lock: ' ',
		size: undefined,
		iNode: undefined,
		linkCount: undefined,
		name: '127.0.0.1:50710->127.0.0.1:50711',
		protocol: 'TCP',
		version: 6,
		from: { address: '127.0.0.1', port: 50710 },
		to: { address: '127.0.0.1', port: 50711 }
	}
]
```


## Reference

### ProcessInfo

```ts
interface ProcessInfo
{
	process: Process;
	files: Array< File | FileDescriptorIP | UnknownFile >;
	texts: Array< InternalFile >;
}
```

### Process

```ts
interface Process
{
	pid: number;
	gpid?: number;
	ppid?: number;
	tid?: number;
	user?: string;
	name?: string;
	cwd?: InternalFile;
}
```

### InternalFile

```ts
interface InternalFile
{
	fd: string; // Note `string` - it's not a traditional file descriptor
	type: Type;
	access: Access | void;
	lock: Lock | void;
	size: Size | void;
	iNode: INode | void;
	linkCount: LinkCount | void;
	name: string | void;
}
```

### File

```ts
interface File
{
	// From base type
	fd: number;
	type: Type;
	access: Access | void;
	lock: Lock | void;
	size: Size | void;
	iNode: INode | void;
	linkCount: LinkCount | void;
	name: string | void;

	// Specific to File
	majorMinorDeviceNumber: MajorMinorDeviceNumber | void;
	flags: RawFileFlags | void;
	offset: Offset | void;
}
```

### UnknownFile

```ts
interface UnknownFile
{
	// From base type
	fd: number;
	type: Type;
	access: Access | void;
	lock: Lock | void;
	size: Size | void;
	iNode: INode | void;
	linkCount: LinkCount | void;
	name: string | void;

	// Specific to UnknownFile
	cmd: string | undefined;
	fileStructureShareCount: FileStructureShareCount | undefined; // FCT
	charCode: CharacterCode | undefined;
	majorMinorDeviceNumber: MajorMinorDeviceNumber | undefined;
	fileStructureAddress: FileStructureAddress | undefined; // FILE-ADDR
	flags: RawFileFlags | undefined; // FILE-FLAG
	loginName: LoginName | undefined;
	node: Node | undefined; // NODE
	offset: Offset | undefined;
	protocolName: ProtocolName | undefined;
	deviceNumber: DeviceNumber | undefined // DEVICE
	streamIdentification: StreamIdentification | undefined;
	tcpTpiInformation: TcpTpiInformation | undefined;
	solarisZoneName: SolarisZoneName | undefined;
	seLinuxSecurityContext: SELinuxSecurityContext | undefined;
	1: any | undefined;
	2: any | undefined;
	3: any | undefined;
	4: any | undefined;
	5: any | undefined;
	6: any | undefined;
	7: any | undefined;
	8: any | undefined;
	9: any | undefined;
}
```

### FileDescriptorIP

```ts
interface FileDescriptorIP
{
	// From base type
	fd: number;
	type: 'IP';
	access: Access | void;
	lock: Lock | void;
	size: Size | void;
	iNode: INode | void;
	linkCount: LinkCount | void;
	name: string | void;

	// Specific to FileDescriptorIP
	protocol: 'TCP' | 'UDP';
	version: 4 | 6;
	from: IP | void;
	to: IP | void;
}
```

### IP

```ts
export interface IP
{
	address: string;
	port: number;
}
```


[npm-image]: https://img.shields.io/npm/v/list-open-files.svg
[npm-url]: https://npmjs.org/package/list-open-files
[travis-image]: https://img.shields.io/travis/grantila/list-open-files/master.svg
[travis-url]: https://travis-ci.org/grantila/list-open-files
[coverage-image]: https://coveralls.io/repos/github/grantila/list-open-files/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/grantila/list-open-files?branch=master
[lgtm-image]: https://img.shields.io/lgtm/grade/javascript/g/grantila/list-open-files.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/grantila/list-open-files/context:javascript
