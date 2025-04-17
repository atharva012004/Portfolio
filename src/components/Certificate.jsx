import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Box,
  Backdrop,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Zoom,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const CertificateItem = ({ certificate, onOpen }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={certificate.id}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardActionArea onClick={() => onOpen(certificate)}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                display: "block",
                paddingTop: "56.25%", // 16:9 aspect ratio for thumbnail
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.95) contrast(1.05)",
              }}
              image={certificate.imageUrl}
              alt={certificate.altText || "Certificate"}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0, 0, 0, 0.1)", // Subtle overlay
                opacity: 0,
                transition: "opacity 0.2s ease-in-out",
                "&:hover": {
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zoom in={true} style={{ transitionDelay: '150ms' }}>
                <FullscreenIcon sx={{ color: "white", fontSize: 36 }} />
              </Zoom>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const CertificateGallery = ({ certificates }) => {
  const [open, setOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Grid container spacing={3}>
        {certificates.map((certificate) => (
          <CertificateItem
            key={certificate.id}
            certificate={certificate}
            onOpen={handleOpenModal}
          />
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby={selectedCertificate?.id ? `modal-certificate-title-${selectedCertificate.id}` : undefined}
        aria-describedby={selectedCertificate?.id ? `modal-certificate-description-${selectedCertificate.id}` : undefined}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(5px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Zoom in={open}>
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: (theme) => theme.palette.grey[500],
                bgcolor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedCertificate && (
              <img
                src={selectedCertificate.imageUrl}
                alt={selectedCertificate.altText || "Certificate Full View"}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxHeight: "90vh",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        </Zoom>
      </Modal>
    </Box>
  );
};

const CertificatesSection = ({ certificates }) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
    
      </Typography>
      <CertificateGallery certificates={certificates} />
    </Box>
  );
};

const YourComponent = () => {
    const newLocal = "";
  // Define your certificate data array here
  const myCertificates = [
    { id: 'web-dev-1', src:"./python.png", altText: 'Basic Web Development Certificate' },
    
    // Add more certificate objects following the same structure
  ];

  return (
    <div>
      <section>
        <h3></h3>
        <CertificatesSection certificates={myCertificates} />
      </section>
      {/* Other parts of your component */}
    </div>
  );
};

export default YourComponent;