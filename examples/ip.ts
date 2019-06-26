import { lsof } from "../"
import { createServer, connect, AddressInfo } from 'net'

async function testIP( ): Promise< void >
{
	const [ result1 ] = await lsof( );

	const server = createServer( );

	await new Promise( ( resolve, reject ) =>
	{
		server.listen( );
		server.on( 'listening', resolve );
		server.on( 'error', reject );
	} );

	const { port } = < AddressInfo >server.address( )

	const [ result2 ] = await lsof( );

	await new Promise( ( resolve, reject ) =>
	{
		const client = connect( port, 'localhost' );
		client.on( 'connect', resolve );
		client.on( 'error', reject );
	} );

	const [ result3 ] = await lsof( );

	console.log( result1.files.filter( file => file.type === 'IP' ) );
	console.log( result2.files.filter( file => file.type === 'IP' ) );
	console.log( result3.files.filter( file => file.type === 'IP' ) );
}

testIP( )
.catch( err => console.error( err ) );
