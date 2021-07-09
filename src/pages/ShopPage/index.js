import React, { useEffect, useLayoutEffect, useState } from "react";
import queryString from "query-string";

import { useDispatch, useSelector } from "react-redux";
import { Divider, Dropdown } from "rsuite";
import Item from "../../components/Item";
import {
  changePage,
  filterBy,
  getProductList,
  loadPage,
} from "../../features/product";

import Category from "./Category";
import "./shopPage.scss";
import { addSearch, routeChange } from "../../features/router";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "rsuite";
import { useMediaQuery } from "../../utilities/useMediaQuery";
import { AiOutlinePlus } from "react-icons/ai";

const Shop = () => {
  const dispatch = useDispatch();
  const [colNumber, setColNumber] = useState(3);
  const history = useHistory();

  const { products, loading, page, limit, total, count } = useSelector(
    (state) => state.product
  );

  const routers = useSelector((state) => state.routers);

  const filter = {
    category: [
      {
        all: "All",
      },
      {
        "60dc77320653ce0250e9d38f": "Accessories",
      },
      {
        "60dc77410653ce0250e9d391": "Chair",
      },
      {
        "60dc77530653ce0250e9d393": "Decoration",
      },
      {
        "60dc775a0653ce0250e9d395": "Furniture",
      },
      {
        "60dc77600653ce0250e9d397": "Table",
      },
    ],
    color: [],
    size: [
      { all: "All" },
      { large: "Large" },
      { medium: "Medium" },
      { small: "Small" },
    ],
    price: [
      " $0.00 - $20.00",
      "$20.00 - $40.00",
      "£40.00 - £50.00",
      "£50.00 - £60.00",
      "£60.00 +",
    ],
    tag: [],
  };

  const [fieldFilter, setFieldFilter] = useState({
    category: null,
    size: null,
    price: null,
  });

  useEffect(() => {
    const searchStr = routers.option.search;
    var url = queryString.parse(searchStr);

    const activeObj = {};
    const activeField = Object.keys(queryString.parse(searchStr));
    if (activeField.length === 0) {
      setFieldFilter({
        category: "all",
        size: "all",
        price: null,
      });
    }
    activeField.map((el) => (activeObj[el] = queryString.parse(searchStr)[el]));
    setFieldFilter((p) => ({
      ...p,
      ...activeObj,
    }));

    const currentUrl = queryString.parse(window.location.search);

    if (page > currentUrl.page) {
      dispatch(loadPage(currentUrl.page));
    }
    if (currentUrl.page == undefined) {
      dispatch(loadPage(1));
    }
    if (currentUrl.page === undefined) {
      url["page"] = 1;
    } else {
      url["page"] = page > currentUrl.page ? currentUrl.page : page;
    }
    url["limit"] = limit;
    dispatch(filterBy(url));
  }, [routers]);

  useEffect(() => {
    const searchStr = window.location.search;

    var url = queryString.parse(searchStr);
    dispatch(loadPage(url.page ? url.page : 1));
  }, []);

  const nextBtn = () => {
    const url = queryString.parse(routers.option.search);
    url["page"] = url.page !== undefined ? Number(page) + 1 : 2;
    url["limit"] = limit;
    dispatch(changePage("next"));

    dispatch(
      routeChange({
        path: routers.path,
        options: {
          search: `?${queryString.stringify(url)}`,
        },
      })
    );
    history.push(`?${queryString.stringify(url)}`);
  };
  const prevBtn = () => {
    const url = queryString.parse(routers.option.search);
    url["page"] = url.page - 1;
    // dispatch(changePage());
    dispatch(
      routeChange({
        path: routers.path,
        options: {
          search: `?${queryString.stringify(url)}`,
        },
      })
    );
    history.push(`?${queryString.stringify(url)}`);
  };

  const isMobile = useMediaQuery("(max-width: 375px)");

  console.log(isMobile);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <div className="shop-container">
        <div className="shop-left">
          <Category
            title="Category"
            data={filter.category}
            activeItem={fieldFilter.category}
          />
          <Divider />
          <Category
            title="Size"
            data={filter.size}
            activeItem={fieldFilter.size}
          />
          <Divider />
          <Category title="Price" data={filter.price} />
          <Divider />
        </div>
        <div className="shop-right">
          <div className="shop-toolbar">
            <div className="shop-toolbar__left">
              <div>{`Showing ${
                total === 0 ? 0 : page - 1 === 0 ? 1 : (page - 1) * limit
              } - ${
                limit * page > count ? count : limit * page
              } of ${count}`}</div>
            </div>
            {isMobile && (
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setShowFilter((p) => !p)}
              >
                <p style={{ marginRight: "1rem" }}>Filter</p> <AiOutlinePlus />
              </div>
            )}
          </div>

          <div
            className={`mobile-filter ${
              showFilter ? " mobile-filter--show" : ""
            }`}
          >
            <Category
              title="Category"
              data={filter.category}
              activeItem={fieldFilter.category}
            />
            <Divider />
            <Category
              title="Size"
              data={filter.size}
              activeItem={fieldFilter.size}
            />
            <Divider />
            <Category title="Price" data={filter.price} />
            <Divider />
          </div>
          <div
            className="shop-list"
            // style={{ gridTemplateColumns: `repeat(${colNumber}, 1fr)` }}
          >
            {loading && <h1>Loading</h1>}
            {!loading &&
              products &&
              products.map((el, index) => {
                return <Item key={index} data={el} />;
              })}
            {!loading && products.length === 0 && <h2>Noting to show</h2>}
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="btn"
              onClick={prevBtn}
              style={{ marginRight: "2rem" }}
            >
              <Button
                appearance="default"
                onClick={prevBtn}
                disabled={Number(page) === 1}
              >
                <Icon icon={"page-previous"} />
              </Button>
            </div>

            <div className="btn" onClick={nextBtn}>
              <Button appearance="default" disabled={page * limit >= count}>
                <Icon icon={"page-next"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Shop;
