// @ts-nocheck
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import "../styles/MuiOverride.css";
import "react-notifications-component/dist/theme.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import useFirstRender from "../main/useFirstRender";
import {
  openOrganizationsModalState,
  OrganizationsListState,
  OrganizationSelectedState,
  NetworksAndDevicesState,
  ApiKeyState,
  notificationMessageState,
  notificationTypeState,
  triggerShowNotificationState,
} from "../main/GlobalState";

export default function OrganizationsModal(ac) {
  const firstRender = useFirstRender();
  const [apiKey, setapiKey] = useRecoilState(ApiKeyState);
  const [organizationsList, setorganizationsList] = useRecoilState(OrganizationsListState);
  const [OrganizationSelected, setOrganizationSelected] = useRecoilState(OrganizationSelectedState);
  const [openOrganizationsModal, setopenOrganizationsModal] = useRecoilState(openOrganizationsModalState);
  const [NetworksAndDevices, setNetworksAndDevices] = useRecoilState(NetworksAndDevicesState);
  const [notificationMessage, setnotificationMessage] = useRecoilState(notificationMessageState);
  const [notificationType, setnotificationType] = useRecoilState(notificationTypeState);
  const [triggerShowNotification, settriggerShowNotification] = useRecoilState(triggerShowNotificationState);

  const { SearchBar } = Search;

  const handleCloseModal = () => {
    setopenOrganizationsModal(!openOrganizationsModal);
  };

  // ----------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------

  let newData = [];
  let newColumn = [];
  if (organizationsList.length > 0) {
    organizationsList.map((opt, index) => {
      let RowsModel = {
        id: opt.id,
        name: opt.name,
        url: opt.url,
        api: opt.api.enabled === true ? "enabled" : "disabled",
        cloud: opt.cloud.region.name,
        licensing: opt.licensing.model,
      };

      newData.push(RowsModel);
    });

    let ColumnList = ["id", "name", "url", "api", "cloud", "licensing"];

    ColumnList.map((opt) => {
      let ColumnModel = {
        label: opt,
        value: opt,
        dataField: opt,
        text: opt,
        sort: true,
        editable: false,
        style: () => {
          return {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textAlign: "center",
            fontSite: "13px",
          };
        },
      };

      newColumn.push(ColumnModel);
    });
  }

  return (
    <Dialog open={openOrganizationsModal} fullWidth maxWidth={"lg"} onClose={handleCloseModal}>
      <div className="modal-header">
        <h4 className="modal-title">Organizations</h4>
        <DialogActions>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </DialogActions>
      </div>
      <DialogContent dividers>
        <div>
          {organizationsList.length > 0 ? (
            <ToolkitProvider search keyField="id" data={newData} columns={newColumn}>
              {(props) => (
                <div>
                  <SearchBar style={{ width: "299px" }} {...props.searchProps} />
                  <BootstrapTable
                    // eslint-disable-next-line
                    {...props.baseProps}
                    bootstrap4
                    striped
                    hover
                    selectRow={ac.dc.selectRowOrganizations}
                  />
                </div>
              )}
            </ToolkitProvider>
          ) : (
            <div className="page-content empty-table" style={{ position: "relative" }}>
              <div className="container text-center">
                <div className="display-1 text-muted mb-5">
                  <i className="fa fa-database" aria-hidden="true"></i>
                </div>
                <h1 className="h2 mb-3">Oops.. We did not find any Organization..</h1>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleCloseModal}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
}
