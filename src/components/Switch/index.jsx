import { SwitchContainer, SwitchInput, SwitchSlider } from './styles';

export function Switch({ checked, onChange }) {
  return (
    <SwitchContainer onClick={() => onChange(!checked)}>
      <SwitchInput
        type="checkbox"
        checked={checked}
        readOnly
      />
      <SwitchSlider $checked={checked} />
    </SwitchContainer>
  );
}