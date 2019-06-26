
export type RawType =
	"IPv4"   | // An IPv4 socket
	"IPv6"   | /* An open IPv6 network file - even if its address is IPv4,
	              mapped in an IPv6 address */
	"ax25"   | // A Linux AX.25 socket
	"inet"   | // An Internet domain socket
	"lla"    | // A HP-UX link level access file
	"rte"    | // An AF_ROUTE socket
	"sock"   | // A socket of unknown domain
	"unix"   | // A UNIX domain socket
	"x.25"   | // An HP-UX x.25 socket
	"BLK"    | // A block special file
	"CHR"    | // A character special file
	"DEL"    | // A Linux map file that has been deleted
	"DIR"    | // A directory
	"DOOR"   | // A VDOOR file
	"FIFO"   | // A FIFO special file
	"KQUEUE" | // A BSD style kernel event queue file
	"LINK"   | // A symbolic link file
	"MPB"    | // A multiplexed block file
	"MPC"    | // A multiplexed character file
	"NOFD"   | /* A Linux /proc/<PID>/fd directory that can't be opened --
				  the directory path appears in the NAME column, followed by
				  an error message */
	"NPOLICY"| // Unknown MacOS
	"PAS"    | // A /proc/as file
	"PAXV"   | // A /proc/auxv file
	"PCRE"   | // A /proc/cred file
	"PCTL"   | // A /proc control file
	"PCUR"   | // The current /proc process
	"PCWD"   | // A /proc current working directory
	"PDIR"   | // A /proc directory
	"PETY"   | // A /proc executable type (etype)
	"PFD"    | // A /proc file descriptor
	"PFDR"   | // A /proc file descriptor directory
	"PFIL"   | // An executable /proc file
	"PFPR"   | // A /proc FP register set
	"PGD"    | // A /proc/pagedata file
	"PGID"   | // A /proc group notifier file
	"PIPE"   | // Pipes
	"PLC"    | // A /proc/lwpctl file
	"PLDR"   | // A /proc/lpw directory
	"PLDT"   | // A /proc/ldt file
	"PLPI"   | // A /proc/lpsinfo file
	"PLST"   | // A /proc/lstatus file
	"PLU"    | // A /proc/lusage file
	"PLWG"   | // A /proc/gwindows file
	"PLWI"   | // A /proc/lwpsinfo file
	"PLWS"   | // A /proc/lwpstatus file
	"PLWU"   | // A /proc/lwpusage file
	"PLWX"   | // A /proc/xregs file
	"PMAP"   | // A /proc map file (map)
	"PMEM"   | // A /proc memory image file
	"PNTF"   | // A /proc process notifier file
	"POBJ"   | // A /proc/object file
	"PODR"   | // A /proc/object directory
	"POLP"   | // An old format /proc light weight process file
	"POPF"   | // An old format /proc PID file
	"POPG"   | // An old format /proc page data file
	"PORT"   | // A SYSV named pipe
	"PREG"   | // A /proc register file
	"PRMP"   | // A /proc/rmap file
	"PRTD"   | // A /proc root directory
	"PSGA"   | // A /proc/sigact file
	"PSIN"   | // A /proc/psinfo file
	"PSTA"   | // A /proc status file
	"PSXSEM" | // A POSIX semaphore file
	"PSXSHM" | // A POSIX shared memory file
	"PUSG"   | // A /proc/usage file
	"PW"     | // A /proc/watch file
	"PXMP"   | // A /proc/xmap file
	"REG"    | // A regular file
	"SMT"    | // A shared memory transport file
	"STSO"   | // A stream socket
	"systm"  | // Unknown MacOS
	"UNNM"   | // An unnamed type file
	"XNAM"   | // An OpenServer Xenix special file of unknown type
	"XSEM"   | // An OpenServer Xenix semaphore file
	"XSD";     // An OpenServer Xenix shared data file

export type Access =
	'r' | // Read access
	'w' | // Write access
	'u' | // Read and write access
	' ';  // Unknown

export type Lock =
	'N' | // NFS-lock
	'r' | // Read lock on part of the file
	'R' | // Read lock on the entire file
	'w' | // Write lock on part of the file
	'W' | // Write lock on the entire file
	'u' | // Read and write lock of any length
	'U' | // Unknown lock
	'x' | // OpenServer Xenix lock on part of the file
	'X';  // OpenServer Xenix lock on the entire file

export type FileDescriptor =
	number |  // File descriptor number
	'cwd'  |  // Current working directory
	string |  // 'Lnn': Library references (AIX)
	'err'  |  // FD information error (see NAME column)
	'jld'  |  // Jail directory (FreeBSD)
	'ltx'  |  // Shared library text (code and data)
	string |  // 'Mxx': Hex memory-mapped type number xx
	'm86'  |  // DOS Merge mapped file
	'mem'  |  // Memory-mapped file
	'mmap' |  // Memory-mapped device
	'pd'   |  // Parent directory
	'rtd'  |  // Root directory
	'tr'   |  // Kernel trace file (OpenBSD)
	'txt'  |  // Program text (code and data)
	'v86';    // VP/ix mapped file

export type FileStructureAddress = number; // Hexadecimal

export type FileStructureShareCount = number;

export type FileFlagTypeFlag =
	'AIO'  | // asynchronous I/O (e.g., FAIO)
	'AP'   | // append
	'ASYN' | // asynchronous I/O (e.g., FASYNC)
	'BAS'  | // block, test, and set in use
	'BKIU' | // block if in use
	'BL'   | // use block offsets
	'BSK'  | // block seek
	'CA'   | // copy avoid
	'CIO'  | // concurrent I/O
	'CLON' | // clone
	'CLRD' | // CL read
	'CR'   | // create
	'DF'   | // defer
	'DFI'  | // defer IND
	'DFLU' | // data flush
	'DIR'  | // direct
	'DLY'  | // delay
	'DOCL' | // do clone
	'DSYN' | // data-only integrity
	'DTY'  | // must be a directory
	'EVO'  | // event only
	'EX'   | // open for exec
	'EXCL' | // exclusive open
	'FSYN' | // synchronous writes
	'GCDF' | // defer during unp_gc() (AIX)
	'GCMK' | // mark during unp_gc() (AIX)
	'GTTY' | // accessed via /dev/tty
	'HUP'  | // HUP in progress
	'KERN' | // kernel
	'KIOC' | // kernel-issued ioctl
	'LCK'  | // has lock
	'LG'   | // large file
	'MBLK' | // stream message block
	'MK'   | // mark
	'MNT'  | // mount
	'MSYN' | // multiplex synchronization
	'NATM' | // don't update atime
	'NB'   | // non-blocking I/O
	'NBDR' | // no BDRM check
	'NBIO' | // SYSV non-blocking I/O
	'NBF'  | // n-buffering in effect
	'NC'   | // no cache
	'ND'   | // no delay
	'NDSY' | // no data synchronization
	'NET'  | // network
	'NFLK' | // don't follow links
	'NMFS' | // NM file system
	'NOTO' | // disable background stop
	'NSH'  | // no share
	'NTTY' | // no controlling TTY
	'OLRM' | // OLR mirror
	'PAIO' | // POSIX asynchronous I/O
	'PP'   | // POSIX pipe
	'R'    | // read
	'RC'   | // file and record locking cache
	'REV'  | // revoked
	'RSH'  | // shared read
	'RSYN' | // read synchronization
	'RW'   | // read and write access
	'SL'   | // shared lock
	'SNAP' | // cooked snapshot
	'SOCK' | // socket
	'SQSH' | // Sequent shared set on open
	'SQSV' | // Sequent SVM set on open
	'SQR'  | // Sequent set repair on open
	'SQS1' | // Sequent full shared open
	'SQS2' | // Sequent partial shared open
	'STPI' | // stop I/O
	'SWR'  | // synchronous read
	'SYN'  | // file integrity while writing
	'TCPM' | // avoid TCP collision
	'TR'   | // truncate
	'W'    | // write
	'WKUP' | // parallel I/O synchronization
	'WTG'  | // parallel I/O synchronization
	'VH'   | // vhangup pending
	'VTXT' | // virtual text
	'XL';    // exclusive lock

export type FileFlagPerProcessFlag =
	'ALLC' | // allocated
	'BR'   | // the file has been read
	'BHUP' | // activity stopped by SIGHUP
	'BW'   | // the file has been written
	'CLSG' | // closing
	'CX'   | // close-on-exec (see fcntl(F_SETFD))
	'LCK'  | // lock was applied
	'MP'   | // memory-mapped
	'OPIP' | // open pending - in progress
	'RSVW' | // reserved wait
	'SHMT' | // UF_FSHMAT set (AIX)
	'USE';   // in use (multi-threaded)

export type FileFlags = {
	types: Array< FileFlagTypeFlag >;
	flags: Array< FileFlagPerProcessFlag >;
};

export type RawFileFlags = string

export type DeviceNumber = number; // Hexadecimal

export type Size = number; // Decimal for <size>, 0x/0t for <offset>

export type INode = number | string;

export type LinkCount = number;

export type LoginName = string;

export type Node = number | string;

export type Name = string;

export type Offset = number; // Usually 0t

export type ProtocolName = string;

export type StreamIdentification = string;

export type CharacterCode = number; // Hexadecimal

export type MajorMinorDeviceNumber = number; // Hexadecimal

export type TcpTpiInformation = string;

export type SolarisZoneName = string;

export type SELinuxSecurityContext = string;

export interface RawFile
{
/*
	a    access: r = read; w = write; u = read/write
	c    command name
	C    file struct share count
	d    device character code
	D    major/minor device number as 0x<hex>
	f    file descriptor (always selected)
	G    file flaGs
	i    inode number
	k    link count
	K    task ID (TID)
	l    lock: r/R = read; w/W = write; u = read/write
	L    login name
	m    marker between repeated output
	n    comment, name, Internet addresses
	o    file offset as 0t<dec> or 0x<hex>
	p    process ID (PID)
	g    process group ID (PGID)
	P    protocol name
	r    raw device number as 0x<hex>
	R    paRent PID
	s    file size
	S    stream module and device names
	t    file type
	T    TCP/TPI info
	u    user ID (UID)
	0    (zero) use NUL field terminator instead of NL
*/
	a: Access | undefined;
	c: string | undefined;
	C: FileStructureShareCount | undefined; // FCT
	d: CharacterCode | undefined;
	D: MajorMinorDeviceNumber | undefined;
	f: FileDescriptor; // FD
	F: FileStructureAddress | undefined; // FILE-ADDR

	/**
	 * For example (with +fg):
	 *   G: 'R,W,NB;CX'
     *   G: 'W,AP;CX'
     *   G: 'R,W,NB;CX'
	 * or equivalent with +fG:
     *   G: '0x7;0x2'
     *   G: '0xa;0x2'
     *   G: '0x7;0x2'
	 */
	G: RawFileFlags | undefined; // FILE-FLAG

	i: INode | undefined; // NODE-ID

	k: LinkCount | undefined;
	l: Lock | undefined;
	L: LoginName | undefined;
	n: Name | undefined; // NAME

	/**
	 * NODE is the node number of a local file
	 * or the inode number of an NFS file in the server host
	 * or the Internet protocol type - e.g, ``TCP''
	 * or ``STR'' for a stream
	 * or ``CCITT'' for an HP-UX x.25 socket
	 * or the IRQ or inode number of a Linux AX.25 socket device.
	 */
	N: Node | undefined; // NODE
	o: Offset | undefined;
	P: ProtocolName | undefined;
	r: DeviceNumber | undefined // DEVICE
	s: Size | undefined; // SIZE, SIZE/OFF, OFFSET
	S: StreamIdentification | undefined;
	t: RawType | undefined; // TYPE

	/**
	 * TCP/TPI information, identified by prefixes (the '='
	 *  is part of the prefix):
	 * QR=<read queue size>
	 * QS=<send queue size>
	 * SO=<socket options and values> (not all dialects)
	 * SS=<socket states> (not all dialects)
	 * ST=<connection state>
	 * TF=<TCP flags and values> (not all dialects)
	 * WR=<window read size>  (not all dialects)
	 * WW=<window write size>  (not all dialects)
	 * (TCP/TPI information isn't reported for all supported
	 * UNIX dialects. The -h or -? help output for the
	 * -T option will show what TCP/TPI reporting can be
	 * requested.)
	 */
	T: TcpTpiInformation | undefined;
	z: SolarisZoneName | undefined;
	Z: SELinuxSecurityContext | undefined;
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

export interface RawProcess
{
	p: number;  // PID
	K?: number; // TID
	R?: number; // PPID
	g?: number; // PGID
	u?: string; // USER
	c?: string; // name
}

export interface RawLsofProcess
{
	proc: RawProcess;
	files: Array< RawFile >;
}
