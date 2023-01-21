import { Box, Container, Typography } from '@mui/material';
import logo from '../../media/headerMedia/logo.svg';
import React from 'react';
import style from './footer.module.css';
import { Instagram, Twitter, Facebook } from '@mui/icons-material';
// import twitter from '../../media/footerMedia/Twitter.svg';
// import facebook from '../../media/footerMedia/Facebook.svg';
// import instagram from '../../media/footerMedia/Instagram.svg';

const Footer = () => {
  return (
    <Box className={style.footer}>
      <Box className={style.footerUnderline} sx={{ background: '#FFFFFF' }}>
        <Container fixed sx={{'&.MuiContainer-root':{
        padding: 0,
        maxWidth: 1240
      }}}>
          <Box className={style.footerInner}>
            <Box className={style.footerLogo}>
              <Box>
                <img src={logo} alt="logo" />
              </Box>
              <Box>
                <Typography variant="h4">MangoRead</Typography>
                <Typography
                  variant="span"
                  sx={{ fontSize: '16px', color: '#878787' }}>
                  Читай мангу с нами
                </Typography>
              </Box>
            </Box>
            <Box className={style.footerLinks}>
              <Box className={style.footerLink}>
                {/* <img src={facebook} alt="face" /> */}
                <Facebook />
                <Typography
                  variant="span"
                  sx={{ fontWeight: 600, fontFamily: 'Roboto' }}>
                  Link One
                </Typography>
              </Box>
              <Box className={style.footerLink}>
                {/* <img src={instagram} alt="inst" /> */}
                <Instagram />
                <Typography
                  variant="span"
                  sx={{ fontWeight: 600, fontFamily: 'Roboto' }}>
                  Link Two
                </Typography>
              </Box>
              <Box className={style.footerLink}>
                {/* <img src={twitter} alt="twit" /> */}
                <Twitter />
                <Typography
                  variant="span"
                  sx={{ fontWeight: 600, fontFamily: 'Roboto' }}>
                  Link Three
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box className={style.footerCom}>
        <Box className={style.comInner}>
          <Typography
            variant="span"
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            ©2022, All right reserved.
          </Typography>
          <Typography
            variant="span"
            className={style.comLink}
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            Privacy Policy
          </Typography>
          <Typography
            variant="span"
            className={style.comLink}
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            Terms of Service
          </Typography>
          <Typography
            variant="span"
            className={style.comLink}
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            Cookies Settings
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
