import { _ADDRESS_ORIGIN } from '$env/static/public';
import { create_sitemap_entry } from '$lib/components/utils/func.js';

export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});

	const pigs = await fetch('/api/pigs/all?all=1');
	const graduated = await fetch('/api/pigs/all?all=1&graduated=1')
	const news = await fetch('/api/articles/news/all?all=1');
	const articles = await fetch('/api/articles/all?all=1');

	let pigs_addresses = await pigs.json();
	pigs_addresses = pigs_addresses.payload.map((item) => {
		return create_sitemap_entry('looking-for-home/' + item.id);
	});

	let graduates_addresses = await graduated.json();
	graduates_addresses = graduates_addresses.payload.map((item) => {
		return create_sitemap_entry('graduates/' + item.id);
	});

	let news_addresses = await news.json();
	news_addresses = news_addresses.payload.map((item) => {
        return create_sitemap_entry('news/' + item.id);
    });

	let articles_addresses = await articles.json();
	articles_addresses = articles_addresses.payload.map((item) => {
		return create_sitemap_entry('articles/' + item.id);
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 <url>
    <loc>${new URL('/', _ADDRESS_ORIGIN).href}</loc>
  </url>
  <url>
    <loc>${new URL('info', _ADDRESS_ORIGIN).href}</loc>
  </url>
  <url>
    <loc>${new URL('looking-for-home', _ADDRESS_ORIGIN).href}</loc>
  </url>
  <url>
    <loc>${new URL('graduates', _ADDRESS_ORIGIN).href}</loc>
  </url>
  <url>
    <loc>${new URL('news', _ADDRESS_ORIGIN).href}</loc>
  </url>
  <url>
    <loc>${new URL('articles', _ADDRESS_ORIGIN).href}</loc>
  </url>
	${pigs_addresses.join('\n')}
	${graduates_addresses.join('\n')}
	${news_addresses.join('\n')}
  	${articles_addresses.join('\n')}
</urlset>`;

	return new Response(sitemap);
}