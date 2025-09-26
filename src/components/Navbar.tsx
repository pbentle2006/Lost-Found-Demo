import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LanguageToggle, useLanguage } from './LanguageToggle';
import { NotificationBell } from './NotificationSystem';

const Navbar = () => {
  const { t } = useLanguage();
  
  return (
    <Box bg="white" px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <RouterLink to="/">
          <Heading size="md" color="blue.500">{t('nav.title')}</Heading>
        </RouterLink>
        
        <Flex alignItems="center" gap={4}>
          <RouterLink to="/partner">
            <Button variant="ghost">{t('nav.partner')}</Button>
          </RouterLink>
          <RouterLink to="/government">
            <Button variant="ghost">{t('nav.government')}</Button>
          </RouterLink>
          <RouterLink to="/report">
            <Button colorScheme="blue">{t('nav.report')}</Button>
          </RouterLink>
          <NotificationBell />
          <LanguageToggle />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
