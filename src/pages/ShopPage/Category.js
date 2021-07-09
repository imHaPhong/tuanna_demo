import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../features/router";
const queryString = require("query-string");

const Category = ({ title, data, activeItem }) => {
  const dispatch = useDispatch();
  const { option } = useSelector((state) => state.routers);
  const history = useHistory();

  const clickHandler = (path, id) => {
    var search = option.search.slice(1);
    const searchObj = queryString.parse(search);
    delete searchObj.page;
    delete searchObj.limit;

    if (id.toString().toLowerCase() === "all") {
      delete searchObj[path.toLowerCase()];
      dispatch(addSearch({ search: `?${queryString.stringify(searchObj)}` }));
      history.push(`/shop?${queryString.stringify(searchObj)}`);
      return;
    }

    if (search === "") {
      dispatch(
        addSearch({ search: `?${path.toString().toLowerCase()}=${id}` })
      );
      history.push(`/shop?${path.toString().toLowerCase()}=${id}`);
    }

    const url = {
      ...searchObj,
      [path.toLowerCase()]: id[0],
    };

    dispatch(
      addSearch({
        search: `?${queryString.stringify(url)}`,
      })
    );
    history.push(`/shop?${queryString.stringify(url)}`);
  };
  return (
    <div className="shop-category">
      <ul>
        <li className="category-title">{title}</li>
        {data.map((el, index) => (
          <li
            key={index}
            className={`${
              activeItem == Object.keys(el).toString() ? "active" : ""
            }`}
          >
            <p onClick={() => clickHandler(title, Object.keys(el))}>
              {Object.values(el)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
