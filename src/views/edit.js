import { html } from '../../node_modules/lit-html/lit-html.js';
import { editRecord, getRecordById } from '../api/data.js';


const editTemplate = (item, onSubmit) => html `
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${item.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${item.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${item.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>
`;
const categories = ["JavaScript", "C#", "Java", "Python"];
export async function editPage(ctx) {
    const id = ctx.params.id;

    const item = await getRecordById(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();


        if (title == '' || category == '' || content == '') return alert('All fields are rquired!');
        if (!categories.includes(category)) return alert('Valid categories are JavaScript, C#, Java, or Python.');

        const data = {
            title,
            category,
            content,
        }

        await editRecord(item._id, data);

        ctx.page.redirect('/home');
    }
}