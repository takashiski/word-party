import { BaseResponse } from "./BaseResponse";
export declare module BiliBili {
    interface Contribution {
        grade: number;
    }
    interface User {
        ruid: number;
        runame: string;
        rface: string;
        fans_club_count: number;
        live_stream_status: number;
        anchor_roomid: number;
    }
    interface UserResponse {
        code: number;
        message: string;
        ttl: number;
        data: User;
    }
    interface CountMap {
        num: number;
        text: string;
        web_svga: string;
        vertical_svga: string;
        horizontal_svga: string;
        special_color: string;
        effect_id: number;
    }
    interface GiftResource {
        id: number;
        name: string;
        price: number;
        type: number;
        coin_type: string;
        bag_gift: number;
        effect: number;
        corner_mark: string;
        corner_background: string;
        broadcast: number;
        draw: number;
        stay_time: number;
        animation_frame_num: number;
        desc: string;
        rule: string;
        rights: string;
        privilege_required: number;
        count_map: CountMap[];
        img_basic: string;
        img_dynamic: string;
        frame_animation: string;
        gif: string;
        webp: string;
        full_sc_web: string;
        full_sc_horizontal: string;
        full_sc_vertical: string;
        full_sc_horizontal_svga: string;
        full_sc_vertical_svga: string;
        bullet_head: string;
        bullet_tail: string;
        limit_interval: number;
        bind_ruid: number;
        bind_roomid: number;
        gift_type: number;
        combo_resources_id: number;
        max_send_limit: number;
        weight: number;
        goods_id: number;
        has_imaged_gift: number;
        left_corner_text: string;
        left_corner_background: string;
        gift_banner?: any;
        diy_count_map: number;
        effect_id: number;
    }
    interface GuardResource {
        img: string;
        level: number;
        name: string;
    }
    interface ComboResource {
        color_one: string;
        color_two: string;
        combo_resources_id: number;
        img_four: string;
        img_one: string;
        img_three: string;
        img_two: string;
    }
    interface FansMedal {
        anchor_roomid: number;
        guard_level: number;
        icon_id: number;
        is_lighted: number;
        medal_color: number;
        medal_color_border: number;
        medal_color_end: number;
        medal_color_start: number;
        medal_level: number;
        medal_name: string;
        score: number;
        special: string;
        target_id: number;
    }
    interface InteractData {
        contribution: Contribution;
        dmscore: number;
        fans_medal: FansMedal;
        identities: number[];
        is_spread: number;
        msg_type: number;
        roomid: number;
        score: number;
        spread_desc: string;
        spread_info: string;
        tail_icon: number;
        timestamp: number;
        trigger_time: number;
        uid: number;
        uname: string;
        uname_color: string;
    }
    interface MedalInfo {
        anchor_roomid: number;
        anchor_uname: string;
        guard_level: number;
        icon_id: number;
        is_lighted: number;
        medal_color: number;
        medal_color_border: number;
        medal_color_end: number;
        medal_color_start: number;
        medal_level: number;
        medal_name: string;
        special: string;
        target_id: number;
    }
    interface GiftData {
        action: string;
        batch_combo_id: string;
        batch_combo_send?: any;
        beatId: string;
        biz_source: string;
        blind_gift?: any;
        broadcast_id: number;
        coin_type: string;
        combo_resources_id: number;
        combo_send?: any;
        combo_stay_time: number;
        combo_total_coin: number;
        crit_prob: number;
        demarcation: number;
        discount_price: number;
        dmscore: number;
        draw: number;
        effect: number;
        effect_block: number;
        face: string;
        float_sc_resource_id: number;
        giftId: number;
        giftName: string;
        giftType: number;
        gold: number;
        guard_level: number;
        is_first: boolean;
        is_special_batch: number;
        magnification: number;
        medal_info: MedalInfo;
        name_color: string;
        num: number;
        original_gift_name: string;
        price: number;
        rcost: number;
        remain: number;
        rnd: string;
        send_master?: any;
        silver: number;
        super: number;
        super_batch_gift_num: number;
        super_gift_num: number;
        svga_block: number;
        tag_image: string;
        tid: string;
        timestamp: number;
        top_list?: any;
        total_coin: number;
        uid: number;
        uname: string;
    }
    type InfoData = [
        [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            string,
            number,
            number,
            number,
            string,
            number,
            {
                bulge_display: number;
                emoticon_unique: string;
                height: number;
                in_player_area: number;
                is_dynamic: number;
                url: string;
                width: number;
            } | "{}",
            string,
            {
                mode: number;
                show_player_type: number;
                extra: string;
            }
        ],
        string,
        [
            number,
            string,
            number,
            number,
            number,
            number,
            number,
            string
        ],
        // user data
        [
            number,
            string,
            string,
            number,
            number,
            string,
            number,
            number,
            number,
            number
        ] | [],
        number[],
        string[],
        number,
        number,
        null,
        {
            ts: number;
            ct: string;
        },
        number,
        number,
        null,
        null,
        number,
        number
    ];
    type RootResponse = {
        cmd: string;
        data?: GiftData | InteractData;
        info: InfoData;
    };
    interface Label {
        name: string;
        level: number;
    }
    interface CommentResponse extends BaseResponse {
        gift?: GiftResource;
        infoData?: InfoData;
        giftData?: GiftData;
    }
}
