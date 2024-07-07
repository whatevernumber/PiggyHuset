export function load({cookies}) {

	const authorized = !!cookies.get('bearer');

	return {
		authorized: authorized,
	}
}