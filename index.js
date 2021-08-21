const list = require("./list.json")

ygopro.i18ns["en-us"].invalid_side_rule = "Illegal cards are contained in your side deck.";
ygopro.i18ns["zh-cn"].invalid_side_rule = "副卡组中包含不允许换入副卡组的卡。";
ygopro.reloadI18nR()

ygopro.ctos_follow_after("UPDATE_DECK", true, async (buffer, info, client, server, datas) => {
	var room = ROOM_all[client.rid];
	if (!room || room.duel_stage === ygopro.constants.DUEL_STAGE.BEGIN) { 
		return false;
	}
	for (var code of list) { 
		if (client.side.indexOf(code) !== -1) { 
			ygopro.stoc_send_chat_to_room(room, "${invalid_side_rule}", ygopro.constants.COLORS.RED);
			ygopro.stoc_send(client, 'ERROR_MSG', {
				msg: 3,
				code: 0
			});
			return true;
		}
	}
});
