import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


const Result = ({ password, copied, setCopied }) => {

   const copyToClipboard = () => {
      const textToCopy = password;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
         setCopied(false);
      }, 600);
   };
   return (

      <div class="input-group mb-5">
         <input
            class="form-control shadow-none"
            type="text"
            value={password}
            readOnly
         />
         <OverlayTrigger
            placement="top"
            show={copied}
            overlay={<Tooltip id="copied-tooltip">Copied!</Tooltip>}
         >
            <button
               className='btn btn-secondary'
               style={{ fontSize: '10px', padding: '0px 4px' }}
               title={password}
               onClick={copyToClipboard}
            >
               <ContentCopyRoundedIcon />
            </button>
         </OverlayTrigger>
      </div>
   )
}

export default Result