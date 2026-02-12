import { useEffect } from "react";
import { websocketService} from "../services/websocketService";
import { GameAction } from '@/types/gameAction'

/*export const useGameSocket = (dispatch: React.Dispatch<GameAction>) => {

    useEffect(() => {
        console.log('useGameSocket')
        websocketService.connect(laptopPort); //tODO this is used in gameContext as well, could abstract this somewhere else

        websocketService.onMessage((data) => {
            dispatch({
                type: "PLAYER_CONNECTION",
             *//*   payload: data,*//*
            });
        });

        return () => {
            websocketService.disconnect();
        };
    }, []);
};
*/