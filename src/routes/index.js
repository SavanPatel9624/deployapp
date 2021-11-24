import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import CompanyProfile from "../components/AboutUs/CompanyProfile";
import Infrastructure from "../components/AboutUs/Infrastructure";
import MediaKit from "../components/AboutUs/MediaKit/index";
import MediaKitDetails from "../components/AboutUs/MediaKit/MediaKitDetails";
import Collection from "../components/Collection";
import CollectionDetails from "../components/Collection/CollectionDetails";
import ContactUs from "../components/ContactUs";
import Export from "../components/Export";
import HostHome from "../Host/components/Home";
import HostCompanyProfile from "../Host/components/AboutUs/CompanyProfile";
import HostInfrastructure from "../Host/components/AboutUs/Infrastructure";
import HostMediaKit from "../Host/components/AboutUs/MediaKit/index";
import HostMediaKitDetails from "../Host/components/AboutUs/MediaKit/MediaKitDetails";
import HostCollection from "../Host/components/Collection";
import HostCollectionDetails from "../Host/components/Collection/CollectionDetails";
import HostContactUs from "../Host/components/ContactUs";
import HostExport from "../Host/components/Export";
import WrapperLayout from "../WrapperLayout";

function HomeRouter() {
  return (
    <div className="middle_content">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <WrapperLayout>
              <Home />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/company-profile"
          render={() => (
            <WrapperLayout>
              <CompanyProfile />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/infrastructure"
          render={() => (
            <WrapperLayout>
              <Infrastructure />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/media-kit"
          render={() => (
            <WrapperLayout>
              <MediaKit />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/media-kit/:id"
          render={() => (
            <WrapperLayout>
              <MediaKitDetails />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/collection"
          render={() => (
            <WrapperLayout>
              <Collection />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/collection/:id"
          render={() => (
            <WrapperLayout>
              <CollectionDetails />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/contact"
          render={() => (
            <WrapperLayout>
              <ContactUs />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/export"
          render={() => (
            <WrapperLayout>
              <Export />
            </WrapperLayout>
          )}
        />
        {/* host Side route */}
        <Route
          exact
          path="/u/home"
          render={() => (
            <WrapperLayout isHost>
              <HostHome />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/company-profile"
          render={() => (
            <WrapperLayout isHost>
              <HostCompanyProfile />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/infrastructure"
          render={() => (
            <WrapperLayout isHost>
              <HostInfrastructure />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/media-kit"
          render={() => (
            <WrapperLayout isHost>
              <HostMediaKit />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/media-kit/:id"
          render={() => (
            <WrapperLayout isHost>
              <HostMediaKitDetails />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/collection"
          render={() => (
            <WrapperLayout isHost>
              <HostCollection />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/collection/:id"
          render={() => (
            <WrapperLayout isHost>
              <HostCollectionDetails />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/contact"
          render={() => (
            <WrapperLayout isHost>
              <HostContactUs />
            </WrapperLayout>
          )}
        />
        <Route
          exact
          path="/u/export"
          render={() => (
            <WrapperLayout isHost>
              <HostExport />
            </WrapperLayout>
          )}
        />
      </Switch>
    </div>
  );
}
export default HomeRouter;
