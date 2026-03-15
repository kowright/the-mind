import { render, fireEvent } from '@testing-library/react-native';
import { SettingsItem } from './settingsItem';
import { useGame } from '../../hooks/useGame';
import { websocketService } from '../../services/websocketService';

jest.mock('../../hooks/useGame');
jest.mock('../../services/websocketService');

describe('SettingsItem', () => {
    beforeEach(() => {
        (useGame as jest.Mock).mockReturnValue({
            state: {
                gameSettings: { someSetting: true },
            },
        });
    });

    it('renders checkbox if settingType is provided', () => {
        const { getByTestId } = render(
            <SettingsItem
                settingName="Test"
                settingDescription="Desc"
                settingType="someSetting"
            />
        );

        const checkbox = getByTestId('checkbox-someSetting');
        expect(checkbox).toBeTruthy(); // Check that it exists
    });

    it('calls websocketService.send when checkbox is toggled', () => {
        const mockSend = jest.fn();
        (websocketService.send as jest.Mock) = mockSend;

        const { getByTestId } = render(
            <SettingsItem
                settingName="Test"
                settingDescription="Desc"
                settingType="someSetting"
            />
        );

        const checkbox = getByTestId('checkbox-someSetting');
        fireEvent(checkbox, 'valueChange', false);

        expect(mockSend).toHaveBeenCalledWith({
            type: 'SETTINGS',
            setting: 'someSetting',
        });
    });

    it('renders without checkbox if settingType is undefined', () => {
        const { queryByTestId } = render(
            <SettingsItem settingName="Test" settingDescription="Desc" />
        );

        expect(queryByTestId(/^checkbox-/)).toBeNull();
    });
});
