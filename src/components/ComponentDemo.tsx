/**
 * Aspora Design System - Component Demo Page
 * Interactive demo showcasing all components
 */

import React, { useState } from 'react';
import { Toggle } from '../../components/Toggle';
import { RadioButton } from '../../components/RadioButton';
import { Checkbox } from '../../components/Checkbox';
import { InputField } from '../../components/InputField';
import { SearchBar } from '../../components/SearchBar';
import { Chip } from '../../components/Chip';
import { Selector } from '../../components/Selector';
import { Slider } from '../../components/Slider';
import { Button } from '../../components/Button';

// Section wrapper component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section style={{
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  }}>
    <h2 style={{
      fontSize: 20,
      fontWeight: 600,
      marginBottom: 24,
      color: '#0E0F11',
      borderBottom: '2px solid #5523B2',
      paddingBottom: 8,
      display: 'inline-block',
    }}>
      {title}
    </h2>
    {children}
  </section>
);

// Demo row for displaying component variants
const DemoRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  }}>
    <span style={{
      width: 120,
      fontSize: 14,
      color: '#666',
      flexShrink: 0,
    }}>
      {label}
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const ComponentDemo: React.FC = () => {
  // Toggle state
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);

  // Radio state
  const [radioValue, setRadioValue] = useState('option1');

  // Checkbox state
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(false);

  // Input state
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [inputSuccess, setInputSuccess] = useState('');

  // Search state
  const [searchValue, setSearchValue] = useState('');

  // Chip state
  const [selectedChips, setSelectedChips] = useState<string[]>(['investments']);

  // Selector state
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Slider state
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75]);

  const toggleChip = (id: string) => {
    setSelectedChips(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: '40px 24px',
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: 48,
      }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          color: '#5523B2',
          marginBottom: 8,
        }}>
          Aspora Design System
        </h1>
        <p style={{
          fontSize: 18,
          color: '#666',
        }}>
          Interactive Component Demo
        </p>
      </header>

      {/* Button Section */}
      <Section title="Button">
        <DemoRow label="Primary">
          <Button variant="primary">Primary Button</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </DemoRow>
        <DemoRow label="Secondary">
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </DemoRow>
      </Section>

      {/* Toggle Section */}
      <Section title="Toggle">
        <DemoRow label="Large">
          <Toggle checked={toggle1} onChange={setToggle1} size="large" />
          <Toggle checked={toggle2} onChange={setToggle2} size="large" />
          <Toggle checked={false} disabled size="large" />
          <Toggle checked={true} disabled size="large" />
        </DemoRow>
        <DemoRow label="Regular">
          <Toggle checked={toggle1} onChange={setToggle1} size="regular" />
          <Toggle checked={toggle2} onChange={setToggle2} size="regular" />
          <Toggle checked={false} disabled size="regular" />
          <Toggle checked={true} disabled size="regular" />
        </DemoRow>
      </Section>

      {/* Radio Button Section */}
      <Section title="Radio Button">
        <DemoRow label="Large">
          <RadioButton
            checked={radioValue === 'option1'}
            value="option1"
            name="demo-large"
            onChange={setRadioValue}
            size="large"
          />
          <RadioButton
            checked={radioValue === 'option2'}
            value="option2"
            name="demo-large"
            onChange={setRadioValue}
            size="large"
          />
          <RadioButton checked={false} disabled size="large" name="disabled" value="d" />
        </DemoRow>
        <DemoRow label="Regular">
          <RadioButton
            checked={radioValue === 'option1'}
            value="option1"
            name="demo-regular"
            onChange={setRadioValue}
            size="regular"
          />
          <RadioButton
            checked={radioValue === 'option2'}
            value="option2"
            name="demo-regular"
            onChange={setRadioValue}
            size="regular"
          />
        </DemoRow>
        <DemoRow label="Small">
          <RadioButton
            checked={radioValue === 'option1'}
            value="option1"
            name="demo-small"
            onChange={setRadioValue}
            size="small"
          />
          <RadioButton
            checked={radioValue === 'option2'}
            value="option2"
            name="demo-small"
            onChange={setRadioValue}
            size="small"
          />
        </DemoRow>
      </Section>

      {/* Checkbox Section */}
      <Section title="Checkbox">
        <DemoRow label="Square">
          <Checkbox checked={checkbox1} onChange={setCheckbox1} size="large" variant="square" />
          <Checkbox checked={checkbox2} onChange={setCheckbox2} size="regular" variant="square" />
          <Checkbox checked={checkbox3} onChange={setCheckbox3} size="small" variant="square" />
          <Checkbox checked={false} disabled variant="square" />
          <Checkbox checked={true} disabled variant="square" />
        </DemoRow>
        <DemoRow label="Circular">
          <Checkbox checked={checkbox1} onChange={setCheckbox1} size="large" variant="circular" />
          <Checkbox checked={checkbox2} onChange={setCheckbox2} size="regular" variant="circular" />
          <Checkbox checked={checkbox3} onChange={setCheckbox3} size="small" variant="circular" />
          <Checkbox checked={false} disabled variant="circular" />
          <Checkbox checked={true} disabled variant="circular" />
        </DemoRow>
      </Section>

      {/* Input Field Section */}
      <Section title="Input Field">
        <div style={{ maxWidth: 400 }}>
          <DemoRow label="Default">
            <div style={{ flex: 1 }}>
              <InputField
                value={inputValue}
                onChange={setInputValue}
                placeholder="Enter your name"
              />
            </div>
          </DemoRow>
          <DemoRow label="With Error">
            <div style={{ flex: 1 }}>
              <InputField
                value=""
                placeholder="Email address"
                errorMessage="Please enter a valid email"
              />
            </div>
          </DemoRow>
          <DemoRow label="With Success">
            <div style={{ flex: 1 }}>
              <InputField
                value="john@example.com"
                placeholder="Email address"
                successMessage="Email is valid!"
              />
            </div>
          </DemoRow>
          <DemoRow label="Disabled">
            <div style={{ flex: 1 }}>
              <InputField
                value="Cannot edit"
                placeholder="Disabled input"
                disabled
              />
            </div>
          </DemoRow>
        </div>
      </Section>

      {/* Search Bar Section */}
      <Section title="Search Bar">
        <div style={{ maxWidth: 500 }}>
          <DemoRow label="Default">
            <div style={{ flex: 1 }}>
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={(v) => alert(`Searching: ${v}`)}
                placeholder="Search something..."
              />
            </div>
          </DemoRow>
          <DemoRow label="Disabled">
            <div style={{ flex: 1 }}>
              <SearchBar
                value=""
                placeholder="Search disabled"
                disabled
              />
            </div>
          </DemoRow>
        </div>
      </Section>

      {/* Chip Section */}
      <Section title="Chip">
        <DemoRow label="With Icon">
          <Chip
            label="Investments"
            selected={selectedChips.includes('investments')}
            onClick={() => toggleChip('investments')}
            variant="chip"
          />
          <Chip
            label="Savings"
            selected={selectedChips.includes('savings')}
            onClick={() => toggleChip('savings')}
            variant="chip"
          />
          <Chip
            label="Budget"
            selected={selectedChips.includes('budget')}
            onClick={() => toggleChip('budget')}
            variant="chip"
          />
          <Chip label="Disabled" disabled variant="chip" />
        </DemoRow>
        <DemoRow label="Sizes">
          <Chip label="Large" selected size="large" variant="chip" />
          <Chip label="Medium" selected size="medium" variant="chip" />
          <Chip label="Small" selected size="small" variant="chip" />
        </DemoRow>
      </Section>

      {/* Selector Section */}
      <Section title="Selector">
        <DemoRow label="Default">
          <Selector
            label="Monthly"
            selected={selectedPeriod === 'monthly'}
            onClick={() => setSelectedPeriod('monthly')}
          />
          <Selector
            label="Yearly"
            selected={selectedPeriod === 'yearly'}
            onClick={() => setSelectedPeriod('yearly')}
          />
          <Selector
            label="Lifetime"
            selected={selectedPeriod === 'lifetime'}
            onClick={() => setSelectedPeriod('lifetime')}
          />
        </DemoRow>
        <DemoRow label="Sizes">
          <Selector label="Large" selected size="large" />
          <Selector label="Medium" selected size="medium" />
          <Selector label="Small" selected size="small" />
        </DemoRow>
        <DemoRow label="Disabled">
          <Selector label="Disabled" disabled />
          <Selector label="Disabled Selected" selected disabled />
        </DemoRow>
      </Section>

      {/* Slider Section */}
      <Section title="Slider">
        <div style={{ maxWidth: 400 }}>
          <DemoRow label="Single">
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
                Value: {sliderValue}
              </div>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                type="single"
              />
            </div>
          </DemoRow>
          <DemoRow label="Range">
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
                Range: {rangeValue[0]} - {rangeValue[1]}
              </div>
              <Slider
                rangeValue={rangeValue}
                onRangeChange={setRangeValue}
                min={0}
                max={100}
                type="range"
              />
            </div>
          </DemoRow>
          <DemoRow label="Disabled">
            <div style={{ flex: 1 }}>
              <Slider value={50} disabled type="single" />
            </div>
          </DemoRow>
        </div>
      </Section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '32px 0',
        color: '#999',
        fontSize: 14,
      }}>
        <p>Aspora Design System &copy; 2025</p>
        <p style={{ marginTop: 8 }}>
          <a
            href="https://github.com/sudhanshuverma550/aspora-design-system"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#5523B2' }}
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default ComponentDemo;
