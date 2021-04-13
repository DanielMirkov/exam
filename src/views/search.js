import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchRecords } from '../api/data.js';
import { itemTemplate } from './common/item.js';


const searchTemplate = (data, onSearch) => html `
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search" >
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${data.length == 0 ? html`<h3 class="no-articles">No matching articles</h3>` :
        Object.values(data).map(itemTemplate)}


    </div>
</section>
`;

export async function searchPage(ctx) {

    console.log(ctx.querystring);
    const searched = ctx.querystring.split('=')[1];
    console.log(searched)
    
    const data = searched == ''? [] : await searchRecords(searched);
   
    ctx.render(searchTemplate(data, onSearch, searched));
    
    async function onSearch(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const query = formData.get('search');
        ctx.page.redirect(`/search?query=` + query);
        
        
    }

    
}