
export function toInteger( raw: string | number ): number
{
	if ( typeof raw === 'number' )
		return raw;

	if ( raw.startsWith( '0t' ) )
		return parseInt( raw.slice( 2 ), 10 );
	else if ( raw.startsWith( '0x' ) )
		return parseInt( raw.slice( 2 ), 16 );
	else
		return parseInt( raw, 10 );
}

export function tryToInteger( raw: string | number, defaultToRaw?: false )
: number;
export function tryToInteger( raw: string | number, defaultToRaw: true )
: number | string;
export function tryToInteger( raw: string | number, defaultToRaw = false )
: number | string
{
	if ( typeof raw === 'number' )
		return raw;

	const val = toInteger( raw );

	if (
		!isNaN( val ) &&
		(
			( '' + val ) === raw ||
			`0t${val}` === raw ||
			`0x${val.toString( 16 )}` === raw
		)
	)
	{
		return val;
	}

	if ( defaultToRaw )
		return raw;
	return NaN;
}
