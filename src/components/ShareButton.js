import React, { useCallback, useRef, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import {
  Fab,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Box,
  useTheme,
  Divider,
  Fade,
} from "@mui/material";
import {
  Email,
  LinkedIn,
  Reddit,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { recordSiteShare } from "../analytics";

const buildUrlWithParams = (base, params) => {
  let url = base;
  let isFirstParam = true;
  for (const paramName of Object.keys(params)) {
    url +=
      (isFirstParam ? "?" : "&") +
      `${paramName}=${encodeURIComponent(params[paramName])}`;
    isFirstParam = false;
  }
  return url;
};

const SocialMediaShareMenuItem = ({ icon, name, href, divider }) => {
  return (
    <MenuItem
      component="a"
      divider={divider}
      href={href}
      onClick={() => recordSiteShare(name.toLowerCase())}
      target="_blank"
      rel="noopener noreferrer"
      role="link"
      title={`Share via ${name}`}
      disableGutters
      disableRipple
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {icon}
        <Typography variant="body1" sx={{ flex: 1 }}>
          {name}
        </Typography>
      </Box>
    </MenuItem>
  );
};

// A share button inspired by the cool one at The Spinoff!
export const ShareButton = ({ href: rawUrl, style }) => {
  const [open, setOpen] = useState(false);
  const fabRef = useRef(null);
  const theme = useTheme();

  const getUrl = (mediumName) => {
    const parsedUrl = new URL(rawUrl);
    parsedUrl.searchParams.set("utm_campaign", "LE");
    parsedUrl.searchParams.set("utm_source", "sharebutton");
    parsedUrl.searchParams.set("utm_medium", mediumName);
    return parsedUrl.href;
  };

  const shareText = `Generation Zero have rated local elections candidates on their climate justice credentials`;

  const linkUrl = getUrl("link");
  const onMenuOpenClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(linkUrl);
      recordSiteShare("link");
    } catch (e) {
      console.error("Failed to copy share link to clipboard.", e);
    }
    setOpen(true);
  }, [linkUrl, setOpen]);

  return (
    <>
      <Menu
        elevation={8}
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={() => fabRef.current}
        MenuListProps={{
          sx: {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <Box
          sx={{
            paddingTop: 0.5,
            paddingBottom: 0.5,
            paddingLeft: 1,
            paddingRight: 1,
          }}
        >
          <li style={{ paddingBottom: 5 }}>
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              Link copied. Thanks for sharing!
            </Typography>
          </li>

          <li>
            <Divider />
          </li>

          <li style={{ paddingTop: 5 }}>
            <Typography variant="subtitle2">Or share directly:</Typography>
          </li>

          <SocialMediaShareMenuItem
            icon={<Twitter sx={{ fill: "#1d9bf0" }} />}
            name="Twitter"
            href={buildUrlWithParams("https://twitter.com/intent/tweet", {
              url: getUrl("twitter"),
              text: shareText + ".\n\nCheck out the results: ",
            })}
          />

          <SocialMediaShareMenuItem
            icon={<Reddit sx={{ fill: "#ff4500" }} />}
            name="Reddit"
            href={buildUrlWithParams("https://www.reddit.com/submit", {
              url: getUrl("reddit"),
              title: shareText,
            })}
          />

          <SocialMediaShareMenuItem
            icon={<Email />}
            name="Email"
            href={buildUrlWithParams("mailto:", {
              subject: shareText,
              body: "Check out the results at: " + getUrl("email"),
            })}
          />

          <SocialMediaShareMenuItem
            icon={<LinkedIn sx={{ fill: "#0a66c2" }} />}
            name="LinkedIn"
            href={buildUrlWithParams(
              "https://www.linkedin.com/sharing/share-offsite/",
              {
                url: getUrl("linkedin"),
              }
            )}
          />

          <SocialMediaShareMenuItem
            icon={<WhatsApp sx={{ fill: "#2db842" }} />}
            name="WhatsApp"
            href={buildUrlWithParams("https://wa.me/", {
              text:
                shareText + ".\n\nCheck out the results: " + getUrl("whatsapp"),
            })}
          />
        </Box>
      </Menu>

      <Fade in={!open}>
        <Tooltip title="Share">
          <Fab
            ref={fabRef}
            color="secondary"
            sx={style}
            onClick={onMenuOpenClick}
            size="small"
          >
            <ShareIcon />
          </Fab>
        </Tooltip>
      </Fade>
    </>
  );
};
