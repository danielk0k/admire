import { CopyIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/footer";

function Success() {
  const router = useRouter();
  const [link, setLink] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    try {
      if (!router.isReady) return;
      const { id } = router.query;
      if (!id) {
        throw new Error("Missing id. Please try again.");
      }
      setLink(`${window.location.origin}/gallery?id=${id}`);
    } catch (error) {
      console.log(error.message);
      router.push("/");
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Admire</title>
        <meta name="Admire" content="Curate and share your NFT art gallery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack>
        <Heading size={{ base: "2xl", lg: "4xl" }}>Congratulations!</Heading>
        <Text fontSize={{ base: "xl", lg: "2xl" }}>
          Your link has been created at:
        </Text>
        <HStack
          spacing={4}
          borderWidth={1}
          borderColor="white"
          borderRadius={10}
          padding={4}
        >
          <Link href={link} isExternal>
            <Text fontSize={{ base: "xl", lg: "2xl" }}>{link}</Text>
          </Link>
          <IconButton
            aria-label="Copy link"
            icon={<CopyIcon />}
            onClick={handleCopy}
            variant="outline"
          />
        </HStack>
      </VStack>
      <Footer />
    </>
  );
}

export default Success;
