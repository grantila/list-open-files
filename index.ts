import { lsof as lsofByCommand } from "./lib/backends/lsof"
import { cpus } from 'os'

export * from './lib/types'

export interface Options
{
	pids?: Array< number >;
	concurrency?: number;
}

export async function lsof( opts: Options = { } )
{
	const pids = opts && opts.pids ? opts.pids : [ process.pid ];
	const concurrency = opts.concurrency || ( cpus( ).length / 2 );

	return lsofByCommand( pids, concurrency );
}
