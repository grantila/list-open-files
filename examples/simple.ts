import { lsof } from "../"

async function testLsof( pids: Array< number > ): Promise< void >
{
	const result =
		pids.length === 0
		? await lsof( )
		: await lsof( { pids } );

	console.log( JSON.stringify( result, null, 4 ) );
}

const pids = process.argv.slice( 2 ).map( num => parseInt( num, 10 ) );

testLsof( pids )
.catch( err => console.error( err ) );
