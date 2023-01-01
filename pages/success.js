import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Success() {
  const router = useRouter();
  const { id } = router.query;
  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(`${window.location.origin}/gallery?id=${id}`);
  }, [id]);
  return (
    <>
      <Head></Head>
      <Box>
        <Heading>Congratulations!</Heading>
        <Text>Your link has been created at:</Text>
        <Link>
          <Text>{link}</Text>
        </Link>
      </Box>
      <VStack as="footer" paddingTop={20}>
        <Heading size="md">Admire</Heading>
        <Text fontSize="sm">Click Curate Share</Text>
      </VStack>
    </>
  );
}

export default Success;
