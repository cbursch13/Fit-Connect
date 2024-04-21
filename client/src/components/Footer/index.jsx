// Component for footer 
import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../../../src/App.css';

export default function Footer() {
  return (
    <footer className="footer">
      <ButtonGroup variant="text" color="primary" aria-label="footer links">
        <Button href="https://github.com/cbursch13/Fit-Connect" target="_blank" rel="noopener noreferrer"><GitHubIcon /></Button>
        <a href="mailto:admin@fitconnect.com" target="_blank" rel="noopener noreferrer"><Button><EmailIcon /></Button></a>
      </ButtonGroup>
    </footer>
  );
};