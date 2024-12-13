import React from "react";
import {
  Box,
  Card,
  Typography,
  Divider,
  Avatar,
  Stack,
  Link,
} from "@mui/material";
import { AccessTime, Person, Event, Info } from "@mui/icons-material";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Ticket({ ticket, tourPackageId }) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "error.main",
          mb: 2,
        }}
      >
        <Info fontSize="small" sx={{ mr: 1 }} /> Booking Summary
      </Typography>

      {/* Content */}
      <Stack direction="row" spacing={2} mb={2}>
        <Avatar
          src={`${distributionUrl}/Packages/${ticket.image || "default-image.jpg"}`} // Fallback for missing image
          alt={ticket.name || "Ticket Image"}
          variant="square"
          sx={{ width: 170, height: 100, borderRadius: 2 }}
        />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "text.primary",
            }}
          >
            {ticket.name || "No Name Available"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ticket.description || "No description provided."}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Booking Details */}
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Event fontSize="small" sx={{ color: "primary.main" }} />
          <Typography variant="body2" fontWeight="bold">
            Day of Travel
          </Typography>
          <Typography variant="body2">
            {ticket.date || "Date not specified"}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Person fontSize="small" sx={{ color: "primary.main" }} />
          <Typography variant="body2" fontWeight="bold">
            Apply for
          </Typography>
          <Typography variant="body2">
            People: {ticket.travelerNum || 0}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Additional Details */}
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccessTime fontSize="small" sx={{ color: "primary.main" }} />
          <Typography variant="body2">
            Effective on {ticket.date || "N/A"}
          </Typography>
        </Stack>
        {[
          {
            label: "Refunds",
            condition: ticket.isRefund,
            positive: "Can Refunds",
            negative: "No refunds",
          },
          {
            label: "Change Schedule",
            condition: ticket.isChangeSchedule,
            positive: "Can Change Schedule",
            negative: "Can't Change Schedule",
          },
        ].map((detail, index) => (
          <Stack direction="row" alignItems="center" spacing={1} key={index}>
            <Info fontSize="small" sx={{ color: "primary.main" }} />
            <Typography
              variant="body2"
              color={detail.condition ? "success.main" : "error.main"}
            >
              {detail.condition ? detail.positive : detail.negative}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{ display: "block", mt: 2, color: "primary.main" }}
      >
        For more details of this ticket,{" "}
        <Link
          component="a"
          href={`/booking/${tourPackageId}`}
          underline="hover"
          color="primary"
        >
          Please see here.
        </Link>
      </Typography>
    </Card>
  );
}
