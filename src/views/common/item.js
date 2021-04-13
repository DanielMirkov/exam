import { html } from '../../../node_modules/lit-html/lit-html.js';

export const itemTemplate = (item) => html `
<a class="article-preview" href="/details/${item._id}">
    <article>
        <h3>Topic: <span>${item.title}</span></h3>
        <p>Category: <span>${item.category}</span></p>
    </article>
</a>
`;