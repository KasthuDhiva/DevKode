import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "@/components/Modals/SettingsModal";
import LanguageModal from "@/components/Modals/LanguageModal";

type PreferenceNavProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	const handleModalOpen = (modalType: string) => {
		if (modalType === "settings") {
			setSettings({ ...settings, settingsModalIsOpen: true });
		} else if (modalType === "language") {
			setSettings({ ...settings, languageModalIsOpen: true });
		}
	};

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
			<div className="relative">
				<button
					className='preferenceBtn group'
					onClick={() => handleModalOpen("language")}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{/* Render the language name dynamically */}
						{settings.language}
					</div>
				</button>
				{/* Render LanguageModal if languageModalIsOpen is true */}
				{settings.languageModalIsOpen && <LanguageModal settings={settings} setSettings={setSettings} />}
			</div>

			<div className='flex items-center m-2'>
				<button
					className='preferenceBtn group'
					onClick={() => handleModalOpen("settings")}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>Settings</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip'>Full Screen</div>
				</button>
			</div>
			{/* Render SettingsModal if settingsModalIsOpen is true */}
			{settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
		</div>
	);
};

export default PreferenceNav;
