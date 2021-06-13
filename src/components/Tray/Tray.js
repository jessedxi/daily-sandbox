import React, { useContext, useEffect, useState } from "react";
import "./Tray.css";
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_SCREEN,
  TYPE_LEAVE,
  TYPE_CHAT,
} from "../TrayButton/TrayButton";
import Chat from "../Chat/Chat";
import CallObjectContext from "../../CallObjectContext";
import { logDailyEvent } from "../../logUtils";
import DailyIframe from "@daily-co/daily-js";
