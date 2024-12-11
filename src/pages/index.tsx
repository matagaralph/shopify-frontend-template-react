import { TitleBar } from '@shopify/app-bridge-react';
import { Box, Card, Layout, Page, Text } from '@shopify/polaris';

export default function IndexPage() {
  return (
    <Page narrowWidth>
      <TitleBar title='App Name' />
      <Layout>
        <Layout.Section>
          <Card roundedAbove='sm'>
            <Text as='h2' variant='headingSm'>
              Online store dashboard
            </Text>
            <Box paddingBlock='200'>
              <Text as='p' variant='bodyMd'>
                View a summary of your online store’s performance.
              </Text>
            </Box>
            <Box paddingBlockStart='200'>
              <Text as='p' variant='bodyMd'>
                View a summary of your online store’s performance, including
                sales, visitors, top products, and referrals.
              </Text>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
