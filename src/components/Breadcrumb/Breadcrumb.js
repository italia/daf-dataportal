import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import routes from '../../routes';

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const BreadcrumbsItem = ({ ...rest, match }) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact ?
      (
        <BreadcrumbItem active>{routeName}</BreadcrumbItem>
      ) :
      (
        <BreadcrumbItem>
          <Link to={match.url || ''}>
            {routeName}
          </Link>
        </BreadcrumbItem>
      )
    );
  }else if(!routeName && match.isExact){
    if(match.url.indexOf('dataset')!==-1)
      return <BreadcrumbItem active>Dettaglio Dataset</BreadcrumbItem>

    if(match.url.indexOf('userstory')!==-1)
      return <BreadcrumbItem active>Dettaglio Storia</BreadcrumbItem>

    if(match.url.indexOf('dashboard')!==-1)
      return <BreadcrumbItem active>Dettaglio Dashboard</BreadcrumbItem>
  }
  return null;
};

const Breadcrumbs = ({ ...rest, location : { pathname }, match }) => {
  const paths = getPaths(pathname);
  const items = paths.map((path, i) => <Route key={i++} path={path} component={BreadcrumbsItem} />);
  return (
    <Breadcrumb className="mb-0 b-b-0">
      {items}
    </Breadcrumb>
  );
};

export default props => (
  <div className="">
    <Route path="/:path" component={Breadcrumbs} {...props} />
  </div>
);
