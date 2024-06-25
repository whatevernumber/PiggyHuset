export function load({cookies}) {

	const authorized = cookies.get('bearer') ? true : false;

	return {
		authorized: authorized,
	}
}