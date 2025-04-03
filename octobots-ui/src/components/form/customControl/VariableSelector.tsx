import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';
import Icon from '../..//Icon';
import { IField } from '@octobots/ui-segments/src/types';
import FormGroup from '../Group';
import ControlLabel from '../Label';

const VariableButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  color: ${colors.colorPrimary};
  z-index: 3;
  
  &:hover {
    color: ${colors.colorSecondary};
  }
`;

const VariablesPopup = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 250px;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid ${colors.borderPrimary};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-family: 'Tajawal', sans-serif;
`;

const VariableItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${colors.colorPrimary};
  }

  i {
    color: ${props => props.color || colors.colorWhite};
  }
`;

const InputWrapper = styled.div<{ multiline?: boolean }>`
  position: relative;
  width: 100%;

  input, textarea {
    width: 100%;
    padding: 8px 35px 8px 12px;
    border: 1px solid ${colors.borderPrimary};
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    background: transparent;
    resize: ${props => props.multiline ? 'vertical' : 'none'};
    min-height: ${props => props.multiline ? '80px' : 'auto'};
    position: relative;
    z-index: 2;
    color: transparent;
    caret-color: ${colors.colorBlack};
    
    &:focus {
      outline: none;
      border-color: ${colors.colorPrimary};
    }

    &:disabled {
      background: ${colors.colorLightGray};
      cursor: not-allowed;
    }
  }
`;

const DisplayLayer = styled.div<{ multiline?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 35px 8px 12px;
  pointer-events: none;
  background: transparent;
  white-space: ${props => props.multiline ? 'pre-wrap' : 'pre'};
  overflow: ${props => props.multiline ? 'auto' : 'hidden'};
  z-index: 1;
  font-size: 14px;
  line-height: 1.5;
  font-family: inherit;
  color: ${colors.colorBlack};
  
  .variable-tag {
    display: inline-flex;
    align-items: center;
    background: ${colors.colorWhite};
    border: 1px solid ${colors.borderPrimary};
    border-radius: 3px;
    padding: 0 4px;
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: ${colors.colorPrimary};
    white-space: nowrap;
    vertical-align: baseline;

    i {
      margin-right: 4px;
      font-size: 12px;
    }
  }
`;

interface VariableSelectorProps {
    fields: IField[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
}

export const VariableSelector: React.FC<VariableSelectorProps> = ({
    fields,
    value,
    onChange,
    placeholder,
    multiline,
    rows = 3,
    type = 'text',
    label,
    required,
    disabled
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInsert = (field: IField) => {
        if (!inputRef.current) return;

        const start = inputRef.current.selectionStart || cursorPosition;
        const end = inputRef.current.selectionEnd || cursorPosition;
        const variable = `{{${field.value}}}`;

        const newValue = value.substring(0, start) + variable + value.substring(end);
        const event = {
            target: { value: newValue }
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
        setIsOpen(false);

        setTimeout(() => {
            if (inputRef.current) {
                const newPosition = start + variable.length;
                inputRef.current.selectionStart = newPosition;
                inputRef.current.selectionEnd = newPosition;
                inputRef.current.focus();
                setCursorPosition(newPosition);
            }
        }, 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (inputRef.current) {
            setCursorPosition(inputRef.current.selectionStart || 0);
        }
    };

    const getDisplayValue = () => {
        let displayValue = value;
        let segments: string[] = [];
        let lastIndex = 0;

        fields.forEach(field => {
            const variablePattern = new RegExp(`{{${field.value}}}`, 'g');
            let match;

            while ((match = variablePattern.exec(displayValue)) !== null) {
                // Add text before the variable
                if (match.index > lastIndex) {
                    segments.push(displayValue.substring(lastIndex, match.index));
                }

                // Add the variable tag
                segments.push(`<span class="variable-tag">
                    <i class="icon-${field.icon || 'clipboard-1'}"></i>
                    ${field.label}
                </span>`);

                lastIndex = match.index + match[0].length;
            }
        });

        // Add remaining text
        if (lastIndex < displayValue.length) {
            segments.push(displayValue.substring(lastIndex));
        }

        return segments.join('');
    };

    const InputComponent = multiline ? 'textarea' : 'input';

    const input = (
        <InputWrapper multiline={multiline}>
            <div style={{ position: 'relative' }}>
                <InputComponent
                    ref={inputRef}
                    type={type}
                    value={value}
                    onChange={handleInputChange}
                    onSelect={() => {
                        if (inputRef.current) {
                            setCursorPosition(inputRef.current.selectionStart || 0);
                        }
                    }}
                    placeholder={placeholder}
                    rows={multiline ? rows : undefined}
                    disabled={disabled}
                />

                <DisplayLayer multiline={multiline} dangerouslySetInnerHTML={{ __html: getDisplayValue() }} />

                {!disabled && (
                    <VariableButton
                        ref={buttonRef}
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        title="Insert variable"
                    >
                        <Icon icon="code" size={16} />
                    </VariableButton>
                )}
            </div>

            {isOpen && !disabled && (
                <VariablesPopup ref={popupRef}>
                    {fields.map((field, index) => (
                        <VariableItem
                            key={index}
                            onClick={() => handleInsert(field)}
                            color={field.color}
                        >
                            <Icon icon={field.icon || 'clipboard-1'} size={16} />
                            {field.label}
                        </VariableItem>
                    ))}
                </VariablesPopup>
            )}
        </InputWrapper>
    );

    if (label) {
        return (
            <FormGroup>
                <ControlLabel required={required}>{label}</ControlLabel>
                {input}
            </FormGroup>
        );
    }

    return input;
};