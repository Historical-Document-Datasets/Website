import type { Editor } from '@tiptap/core'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { LinkProps } from '../../types'
import { cn } from '@/lib/utils'

interface LinkEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor
  onSetLink: ({ url, text }: LinkProps) => void
  close?: () => void
}

const LinkEditBlock = ({ editor, onSetLink, close, className, ...props }: LinkEditBlockProps) => {
  const formRef = React.useRef<HTMLDivElement>(null)

  const [field, setField] = React.useState<LinkProps>({
    url: '',
    text: '',
  })

  const data = React.useMemo(() => {
    const { href } = editor.getAttributes('link')
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, ' ')

    return {
      url: href,
      text,
    }
  }, [editor])

  React.useEffect(() => {
    setField(data)
  }, [data])

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()

    if (formRef.current) {
      const isValid = Array.from(formRef.current.querySelectorAll('input')).every(input => input.checkValidity())

      if (isValid) {
        onSetLink(field)
        close?.()
      } else {
        formRef.current.querySelectorAll('input').forEach(input => {
          if (!input.checkValidity()) {
            input.reportValidity()
          }
        })
      }
    }
  }

  return (
    <div ref={formRef}>
      <div className={cn('space-y-4', className)} {...props}>
        <div className="space-y-1">
          <Label>Link</Label>
          <Input
            type="url"
            required
            placeholder="Paste a link"
            value={field.url ?? ''}
            onChange={e => setField({ ...field, url: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <Label>Display text (optional)</Label>
          <Input
            type="text"
            placeholder="Text to display"
            value={field.text ?? ''}
            onChange={e => setField({ ...field, text: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-2">
          {close && (
            <Button variant="ghost" type="button" onClick={close}>
              Cancel
            </Button>
          )}

          <Button type="button" onClick={handleClick}>
            Insert
          </Button>
        </div>
      </div>
    </div>
  )
}

export { LinkEditBlock }
