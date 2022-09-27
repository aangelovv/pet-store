import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/api.js';
import { getUserData } from './utility.js';
import { loginPage, registerPage } from './views/auth.js';


import { createPage } from './views/create.js';
import { dashboard } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
// import { deletePage } from './views/profile.js';
import { homePage } from './views/homePage.js';


export const main = document.getElementById('content');

setUserNav();

document.getElementById('btnForLogOut').addEventListener('click', onLogout);

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/homePage', decorateContext, homePage);
page('/dashboard', decorateContext, dashboard);
page('/login', decorateContext, loginPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
// page('/delete/id', decorateContext, deletePage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();

    next();
}

function setUserNav() {
    const user = getUserData();
    if (user) {
        document.querySelector('#users').style.display = 'inline';
        document.querySelector('#guests').style.display = 'none';
        document.querySelector('#both').style.display = 'inline';
       
    } else {
        document.querySelector('#users').style.display = 'none';
        document.querySelector('#guests').style.display = 'inline';
        document.querySelector('#both').style.display = 'inline';
    }
}

async function onLogout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
  }