import {
	RawType,
	Access,
	Lock,
	Size,
	INode,
	LinkCount,
	FileDescriptor,
	MajorMinorDeviceNumber,
	RawFileFlags,
	Offset,
	FileStructureShareCount,
	CharacterCode,
	FileStructureAddress,
	LoginName,
	Node,
	ProtocolName,
	DeviceNumber,
	StreamIdentification,
	TcpTpiInformation,
	SolarisZoneName,
	SELinuxSecurityContext,
} from "./backends/lsof/types"

// Public interfaces:

export type Type = Exclude< RawType, 'IPv4' | 'IPv6' > | 'IP';

export interface FileBase
{
	type: Type;
	access: Access | void;
	lock: Lock | void;
	size: Size | void;
	iNode: INode | void;
	linkCount: LinkCount | void;
	name: string | void;
}

export interface FileDescriptorBase extends FileBase
{
	fd: number;
}

export type InternalFileType = Exclude< FileDescriptor, number >;

export interface InternalFile extends FileBase
{
	fd: InternalFileType;
}

export interface IP
{
	address: string;
	port: number;
}

export interface FileDescriptorIP extends FileDescriptorBase
{
	type: 'IP';
	protocol: 'TCP' | 'UDP';
	version: 4 | 6;
	from: IP | void;
	to: IP | void;
}

export interface File extends FileDescriptorBase
{
	majorMinorDeviceNumber: MajorMinorDeviceNumber | void;
	flags: RawFileFlags | void;
	offset: Offset | void;
}

export interface UnknownFile extends FileDescriptorBase
{
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

export interface Process
{
	pid: number;
	gpid?: number;
	ppid?: number;
	tid?: number;
	user?: string;
	name?: string;
	cwd?: InternalFile;
}

export type ProcessFile = File | FileDescriptorIP | UnknownFile;

export interface ProcessInfo
{
	process: Process;
	files: Array< ProcessFile >;
	texts: Array< InternalFile >;
}
