import * as React from "react";
import { Box, Typography } from "@mui/material";
import { epochToMomentTimeZone } from "openstack-uicore-foundation/lib/utils/methods";
import { PHASES } from "@utils/phasesUtils";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "var(--color_text_light)",
  backgroundColor: "var(--color_secondary)",
  aspectRatio: "auto 16/9",
  px: 3,
  py: 5
};

const titleStyle = {
  color: "var(--color_text_light)",
  fontFamily: "var(--font_family)",
  fontSize: "42px",
  fontWeight: 600,
  lineHeight: 1.125
};

const subtitleStyle = {
  color: "var(--color_text_light)",
  fontFamily: "var(--font_family)",
  fontSize: "36px",
  fontWeight: 400,
  lineHeight: 1.25
};

const getSubtitle = (eventClassName, eventPhase, streamingUrl, startDate, timeZoneId) => {
  if (eventClassName !== "Presentation") {
    return "Next session will start soon...";
  }

  if (eventPhase === PHASES.AFTER && !streamingUrl) {
    return "All sessions are being recorded. Videos and slide presentations will be posted on the OCP website in the weeks following the Summit.";
  }

  if (eventPhase < PHASES.DURING || !streamingUrl) {
    const formattedTime = epochToMomentTimeZone(startDate, timeZoneId).format("MMMM Do [at] hh:mm A z");
    return `This simulcast will be available on ${formattedTime}`;
  }

  return "";
};

const PrePostEventSlide = ({ summit, event, eventPhase }) => {
  const { title, class_name: eventClassName, start_date: startDate, streaming_url: streamingUrl } = event;
  const { time_zone_id: timeZoneId } = summit;

  const subtitle = getSubtitle(eventClassName, eventPhase, streamingUrl, startDate, timeZoneId);

  return (
    <Box sx={containerStyles}>
      <Typography gutterBottom sx={titleStyle}>
        {title}
      </Typography>
      <Typography sx={subtitleStyle}>{subtitle}</Typography>
    </Box>
  );
};

export default PrePostEventSlide;
