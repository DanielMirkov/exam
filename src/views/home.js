import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllRecentRecords } from '../api/data.js';


export async function homePage(ctx) {

    const data = await getAllRecentRecords();

    const jsArr = Object.values(data).filter(i => i.category == "JavaScript");
    const cArr = Object.values(data).filter(i => i.category == "C#");
    const javaArr = Object.values(data).filter(i => i.category == "Java");
    const pythonArr = Object.values(data).filter(i => i.category == "Python");

    ctx.render(homeTemplate(jsArr, cArr, javaArr, pythonArr));
}


const homeTemplate = (jsArr, cArr, javaArr, pythonArr) => html `
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${jsArr[0] == undefined ? html`<h3 class="no-articles">No articles yet</h3>` :
        html`<article>
            <h3>${jsArr[0].title}</h3>
            <p>${jsArr[0].content}</p>
            <a href="/details/${jsArr[0]._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${cArr[0] == undefined ? html`<h3 class="no-articles">No articles yet</h3>` :
        html`<article>
            <h3>${cArr[0].title}</h3>
            <p>${cArr[0].content}</p>
            <a href="/details/${cArr[0]._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${javaArr[0] == undefined ? html`<h3 class="no-articles">No articles yet</h3>` :
        html`<article>
            <h3>${javaArr[0].title}</h3>
            <p>${javaArr[0].content}</p>
            <a href="/details/${javaArr[0]._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${pythonArr[0] == undefined ? html`<h3 class="no-articles">No articles yet</h3>` :
        html`<article>
            <h3>${pythonArr[0].title}</h3>
            <p>${pythonArr[0].content}</p>
            <a href="/details/${pythonArr[0]._id}" class="btn details-btn">Details</a>
        </article>`}
    </section>
</section>
`;