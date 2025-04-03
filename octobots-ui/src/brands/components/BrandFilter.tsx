import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldStyle, SidebarCounter, SidebarList } from "../../layout/styles";
import { __, router } from "../../utils";

import { IBrand } from "../../brands/types";
import Box from "../../components/Box";
import DataWithLoader from "../../components/DataWithLoader";

interface IProps {
  counts: { [key: string]: number };
  brands: IBrand[];
  loading: boolean;
  emptyText?: string;
}

function Brands({ counts, brands, loading, emptyText }: IProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   router.removeParams(navigate, location, 'page');
  // }, [location.search]);

  const data = (
    <SidebarList style={{ padding: '15px' }}>
      {brands.map((brand) => {
        const onClick = () => {
          router.setParams(navigate, location, { brand: brand._id });
        };

        return (
          <li key={brand._id}>
            <a
              href="#filter"
              tabIndex={0}
              className={
                router.getParam(location, "brand") === brand._id ? "active" : ""
              }
              onClick={onClick}
            >
              <FieldStyle>{brand.name}</FieldStyle>
              <SidebarCounter>{counts[brand._id]}</SidebarCounter>
            </a>
          </li>
        );
      })}
    </SidebarList>
  );

  return (
    <Box
      title={__("Filter by brand")}
      collapsible={brands.length > 5}
      name="showFilterByBrand"
      isOpen={router.getParam(location, "brand")}
    >
      <div className="no-li-child-color">

        <DataWithLoader
          data={data}
          loading={loading}
          count={brands.length}
          emptyText={emptyText || "Empty"}
          emptyIcon="leaf"
          size="small"
          objective={true}
        />
      </div>
    </Box>
  );
}

export default Brands;
