import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';


import { searchPage } from './views/search.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

import { logout } from './api/data.js';

//contetnt position in MAIN
const main = document.getElementById('main-content');

page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/index.html', decorateContext, homePage);
page('/catalog', decorateContext, catalogPage);
page('/search', decorateContext, searchPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
///for logged users
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);


document.getElementById('logoutBtn').addEventListener('click', async() => {

    await logout();
    page.redirect('/');
    setUserNav();
});

setUserNav();
//start app
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}
///set user nav based on ID OR QUERY

function setUserNav() {

    const userId = sessionStorage.getItem('userId');

    if (userId != null) {

        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}