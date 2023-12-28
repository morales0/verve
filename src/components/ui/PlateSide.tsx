import { Box, Text } from "@mantine/core";

export type PlateSideProps = {
  weight: number;
};

function mapRange(value: number): number {
  // Calculate the normalized value in the input range
  const normalizedValue: number = (value - 2.5) / (45 - 2.5);
  // Map the normalized value to the output range
  const mappedValue: number = normalizedValue * (70 - 30) + 30;
  return mappedValue;
}

export const PlateSide = ({ weight }: PlateSideProps) => {
  const height = mapRange(weight);
  const width = 22;

  return (
    <Box
      h={height}
      w={width}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle, rgba(255,255,255,0) 60%, rgba(67, 67, 67, 0.2) 100%)",
        border: "1px solid",
        borderColor: "gray",
        borderRadius: "5px",
      }}
    >
      <Text fz="xs">{weight}</Text>
    </Box>
  );
};
