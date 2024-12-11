import { Box, Card, EmptyState, Page } from '@shopify/polaris';
import { notFoundImage } from '../assets';

export default function NotFound() {
  return (
    <Page>
      <Card roundedAbove='sm'>
        <Box paddingBlockStart='200'>
          <EmptyState
            heading='This page could not be found.'
            image={notFoundImage}
          >
            <p>
              Check the URL and try again, or use the search bar to find what
              you need.
            </p>
          </EmptyState>
        </Box>
      </Card>
    </Page>
  );
}
