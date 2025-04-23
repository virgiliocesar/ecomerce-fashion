import React from 'react';
import { Outlet, useLocation } from 'react-router';
const pageTitles = {
    '/pages': 'Navegue pelas Páginas',
    '/pages/ajuda': 'Ajuda (FAQ)',
    '/pages/sobre': 'Sobre Nós',
    '/pages/privacidade': 'Política de Privacidade',
    '/pages/termos': 'Termos e Condições',
    '/pages/rastreio': 'Rastreie seu Pedido',
    '/pages/politica-de-entrega': 'Política de Entrega',
    '/pages/politica-de-troca': 'Política de Troca e Devolução',
    '/pages/trabalhe-conosco': 'Trabalhe Conosco',

};

const PagesLayout = () => {
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'Página';

    return (
        <>
        <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{title}</h2>
          </section>
          <Outlet />
        </>
    );
};

export default PagesLayout;
