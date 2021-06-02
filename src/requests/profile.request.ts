// @ts-ignore
import FormData from 'form-data';
import { LinkedInRequest } from '../core/linkedin-request';
import { GetOwnProfileResponse } from '../responses/own-profile.response.get';
import { GetProfileResponse } from '../responses/profile.response.get';

export class ProfileRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  getProfile({ publicIdentifier }: { publicIdentifier: string }): Promise<GetProfileResponse> {
    const queryParams = {
      q: 'memberIdentity',
      memberIdentity: publicIdentifier,
      decorationId: 'com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-35',
    };

    return this.request.get<GetProfileResponse>('identity/dash/profiles', {
      params: queryParams,
    });
  }

  visitProfile({ profileArn }: { profileArn: string }): Promise<any> {
    /* return this.request.get(`identity/profiles/${profileArn}/promoVisibility`, {
      params: {
        contextType: 'NON_SELF_PROFILE_VIEW',
        promoTypes:
          'List(NON_SELF_PROFILE_PROMOTION,SUGGESTED_ENDORSEMENTS,IM_FOLLOWS_DRAWER,APP_DOWNLOAD,PROFILE_PREMIUM_TIP_PRIVATE_BROWSING,LOCAL_SKILL_EXPERT_SUGGESTIONS,TOP_SKILL_SUGGESTIONS)',
        q: 'findActivePromos',
        vieweeMemberId: profileArn,
      },
    }); */
    const formData = new FormData();
    formData.append('ids', `List(urn:li:fs_miniProfile:${profileArn})`);

    // @ts-ignore
    return this.request.post(`messaging/presenceStatuses`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  getOwnProfile(): Promise<GetOwnProfileResponse> {
    return this.request.get<GetOwnProfileResponse>('me');
  }
}
