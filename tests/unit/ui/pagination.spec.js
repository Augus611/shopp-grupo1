/**
 * @jest-environment jsdom
 */

const utils = require('../../ui-utils.js')

const { getByText, queryByText } = require('@testing-library/dom');
require('@testing-library/jest-dom');

function renderPagination(pagination) {
    return utils.renderString(
        '_pagination.html',
        `{{ pagination(totalPages, currentPage) }}`,
        { ...pagination }
    );
}

describe('Paginación', () => {
    test('Deberia indicar el máximo de páginas', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 4
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const current = getByText(document.body, `de ${pagination.totalPages}`);

        expect(current).toBeVisible();
    });

    test('Deberia indicar la página actual', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 4
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const current = getByText(document.body, `4`);

        expect(current).toBeVisible();
        expect(current.getAttribute('class')).toBe('current');
    });


    test('Deberia indicar el máximo de páginas', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 4
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const current = getByText(document.body, `de ${pagination.totalPages}`);

        expect(current).toBeVisible();
    });

    test('Deberia mostrarse el boton siguiente con el link correspondiente', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 1
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const nextLink = getByText(document.body, 'Siguiente >');

        expect(nextLink).toBeVisible();
        expect(nextLink.getAttribute('href'))
            .toBe(`?page=${pagination.currentPage + 1}`);
    });

    test('Deberia mostrarse el boton anterior con el link correspondiente', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 4
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const prevLink = getByText(document.body, '< Anterior');

        expect(prevLink).toBeVisible();
        expect(prevLink.getAttribute('href')).toBe(`?page=${pagination.currentPage - 1}`);
    });

    test('No debería mostrarse el botón anterior en la primera página', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 1
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const prevLink = queryByText(document.body, '< Anterior');

        expect(prevLink).toBeNull();
    });

    test('No debería mostrarse el botón siguiente en la última página', async () => {
        const pagination = {
            totalPages: 10,
            currentPage: 10
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const nextLink = queryByText(document.body, 'Siguiente >');

        expect(nextLink).toBeNull();
    });

    test('No deberían mostrarse los botones de paginación si hay una única página', async () => {
        const pagination = {
            totalPages: 1,
            currentPage: 1
        }
        const html = renderPagination(pagination);

        document.body.innerHTML = html;
        const prevLink = queryByText(document.body, '< Anterior');
        const nextLink = queryByText(document.body, 'Siguiente >');

        expect(prevLink).toBeNull();
        expect(nextLink).toBeNull();
    });
});
