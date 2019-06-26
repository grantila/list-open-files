import { toInteger, tryToInteger } from "./utils";

describe( "toInteger", ( ) =>
{
	it( "should return numbers as is", ( ) =>
	{
		expect( toInteger( -100 ) ).toBe( -100 );
		expect( toInteger( -1 ) ).toBe( -1 );
		expect( toInteger( 0 ) ).toBe( 0 );
		expect( toInteger( 1 ) ).toBe( 1 );
		expect( toInteger( 100 ) ).toBe( 100 );
		expect( toInteger( Infinity ) ).toBe( Infinity );
		expect( toInteger( -Infinity ) ).toBe( -Infinity );
		expect( toInteger( NaN ) ).toBe( NaN );
	} );

	it( "should parse decimal string by default", ( ) =>
	{
		expect( toInteger( "-100" ) ).toBe( -100 );
		expect( toInteger( "-1" ) ).toBe( -1 );
		expect( toInteger( "0" ) ).toBe( 0 );
		expect( toInteger( "1" ) ).toBe( 1 );
		expect( toInteger( "100" ) ).toBe( 100 );
		expect( toInteger( "Infinity" ) ).toBe( NaN );
		expect( toInteger( "-Infinity" ) ).toBe( NaN );
		expect( toInteger( "NaN" ) ).toBe( NaN );
	} );

	it( "should parse decimal string explicitly", ( ) =>
	{
		expect( toInteger( "0t-100" ) ).toBe( -100 );
		expect( toInteger( "0t-1" ) ).toBe( -1 );
		expect( toInteger( "0t0" ) ).toBe( 0 );
		expect( toInteger( "0t1" ) ).toBe( 1 );
		expect( toInteger( "0t100" ) ).toBe( 100 );
		expect( toInteger( "0tInfinity" ) ).toBe( NaN );
		expect( toInteger( "0t-Infinity" ) ).toBe( NaN );
		expect( toInteger( "0tNaN" ) ).toBe( NaN );
	} );

	it( "should parse hexadecimal string explicitly", ( ) =>
	{
		expect( toInteger( "0x-100" ) ).toBe( -256 );
		expect( toInteger( "0x-1" ) ).toBe( -1 );
		expect( toInteger( "0x0" ) ).toBe( 0 );
		expect( toInteger( "0x1" ) ).toBe( 1 );
		expect( toInteger( "0x100" ) ).toBe( 256 );
		expect( toInteger( "0xInfinity" ) ).toBe( NaN );
		expect( toInteger( "0x-Infinity" ) ).toBe( NaN );
		expect( toInteger( "0xNaN" ) ).toBe( NaN );
	} );
} );

describe( "tryToInteger", ( ) =>
{
	describe( "don't default to raw", ( ) =>
	{
		it( "should return numbers as is", ( ) =>
		{
			expect( tryToInteger( -100 ) ).toBe( -100 );
			expect( tryToInteger( -1 ) ).toBe( -1 );
			expect( tryToInteger( 0 ) ).toBe( 0 );
			expect( tryToInteger( 1 ) ).toBe( 1 );
			expect( tryToInteger( 100 ) ).toBe( 100 );
			expect( tryToInteger( Infinity ) ).toBe( Infinity );
			expect( tryToInteger( -Infinity ) ).toBe( -Infinity );
			expect( tryToInteger( NaN ) ).toBe( NaN );
		} );

		it( "should parse decimal string by default", ( ) =>
		{
			expect( tryToInteger( "-100" ) ).toBe( -100 );
			expect( tryToInteger( "-1" ) ).toBe( -1 );
			expect( tryToInteger( "0" ) ).toBe( 0 );
			expect( tryToInteger( "1" ) ).toBe( 1 );
			expect( tryToInteger( "100" ) ).toBe( 100 );
			expect( tryToInteger( "Infinity" ) ).toBe( NaN );
			expect( tryToInteger( "-Infinity" ) ).toBe( NaN );
			expect( tryToInteger( "NaN" ) ).toBe( NaN );
		} );

		it( "should parse decimal string explicitly", ( ) =>
		{
			expect( tryToInteger( "0t-100" ) ).toBe( -100 );
			expect( tryToInteger( "0t-1" ) ).toBe( -1 );
			expect( tryToInteger( "0t0" ) ).toBe( 0 );
			expect( tryToInteger( "0t1" ) ).toBe( 1 );
			expect( tryToInteger( "0t100" ) ).toBe( 100 );
			expect( tryToInteger( "0tInfinity" ) ).toBe( NaN );
			expect( tryToInteger( "0t-Infinity" ) ).toBe( NaN );
			expect( tryToInteger( "0tNaN" ) ).toBe( NaN );
		} );

		it( "should parse hexadecimal string explicitly", ( ) =>
		{
			expect( tryToInteger( "0x-100" ) ).toBe( -256 );
			expect( tryToInteger( "0x-1" ) ).toBe( -1 );
			expect( tryToInteger( "0x0" ) ).toBe( 0 );
			expect( tryToInteger( "0x1" ) ).toBe( 1 );
			expect( tryToInteger( "0x100" ) ).toBe( 256 );
			expect( tryToInteger( "0xInfinity" ) ).toBe( NaN );
			expect( tryToInteger( "0x-Infinity" ) ).toBe( NaN );
			expect( tryToInteger( "0xNaN" ) ).toBe( NaN );
		} );
	} );

	describe( "default to raw", ( ) =>
	{
		it( "should return numbers as is", ( ) =>
		{
			expect( tryToInteger( -100, true ) ).toBe( -100 );
			expect( tryToInteger( -1, true ) ).toBe( -1 );
			expect( tryToInteger( 0, true ) ).toBe( 0 );
			expect( tryToInteger( 1, true ) ).toBe( 1 );
			expect( tryToInteger( 100, true ) ).toBe( 100 );
			expect( tryToInteger( Infinity, true ) ).toBe( Infinity );
			expect( tryToInteger( -Infinity, true ) ).toBe( -Infinity );
			expect( tryToInteger( NaN, true ) ).toBe( NaN );
		} );

		it( "should parse decimal string by default", ( ) =>
		{
			expect( tryToInteger( "-100", true ) ).toBe( -100 );
			expect( tryToInteger( "-1", true ) ).toBe( -1 );
			expect( tryToInteger( "0", true ) ).toBe( 0 );
			expect( tryToInteger( "1", true ) ).toBe( 1 );
			expect( tryToInteger( "100", true ) ).toBe( 100 );
			expect( tryToInteger( "Infinity", true ) ).toBe( "Infinity" );
			expect( tryToInteger( "-Infinity", true ) ).toBe( "-Infinity" );
			expect( tryToInteger( "NaN", true ) ).toBe( "NaN" );
		} );

		it( "should parse decimal string explicitly", ( ) =>
		{
			expect( tryToInteger( "0t-100", true ) ).toBe( -100 );
			expect( tryToInteger( "0t-1", true ) ).toBe( -1 );
			expect( tryToInteger( "0t0", true ) ).toBe( 0 );
			expect( tryToInteger( "0t1", true ) ).toBe( 1 );
			expect( tryToInteger( "0t100", true ) ).toBe( 100 );
			expect( tryToInteger( "0tInfinity", true ) ).toBe( "0tInfinity" );
			expect( tryToInteger( "0t-Infinity", true ) ).toBe( "0t-Infinity" );
			expect( tryToInteger( "0tNaN", true ) ).toBe( "0tNaN" );
		} );

		it( "should parse hexadecimal string explicitly", ( ) =>
		{
			expect( tryToInteger( "0x-100", true ) ).toBe( -256 );
			expect( tryToInteger( "0x-1", true ) ).toBe( -1 );
			expect( tryToInteger( "0x0", true ) ).toBe( 0 );
			expect( tryToInteger( "0x1", true ) ).toBe( 1 );
			expect( tryToInteger( "0x100", true ) ).toBe( 256 );
			expect( tryToInteger( "0xInfinity", true ) ).toBe( "0xInfinity" );
			expect( tryToInteger( "0x-Infinity", true ) ).toBe( "0x-Infinity" );
			expect( tryToInteger( "0xNaN", true ) ).toBe( "0xNaN" );
		} );
	} );
} );
