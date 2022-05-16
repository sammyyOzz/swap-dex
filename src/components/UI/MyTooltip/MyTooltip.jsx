import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { CopyButton } from '../Button/button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';


export default function TriggersTooltips({ textToCopy, onlyIcon }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleCopyToClipboard = () => {
    handleTooltipOpen();
    navigator.clipboard.writeText(textToCopy || '');
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), 2000)
    }
  }, [open])

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="copied to clipboard"
        placement="right-end"
      >
        {
          !onlyIcon ? (
            <CopyButton outlined onClick={handleCopyToClipboard}>
              copy <ContentCopyIcon fontSize="small" sx={{ ml: '7px' }} />
            </CopyButton>
          ) : (
            <ContentCopyOutlinedIcon className="copyIcon" onClick={handleCopyToClipboard} style={{ cursor: 'pointer' }} />
          )
        }
      </Tooltip>
    </ClickAwayListener>
  );
}
