import { env } from '@/config/env';
import { contract as nonAdminContract } from '@57eme-regiment/auth-package';
import { contract } from '@57eme-regiment/krang-api-contract';
import { initClient } from '@ts-rest/core';

export const krangApi = initClient(contract, {
  baseUrl: env.KRANG_SERVICE_URL,
});

export const wanUserApi = initClient(nonAdminContract.users, {
  baseUrl: env.WANSHITONG_SERVICE_URL,
});
